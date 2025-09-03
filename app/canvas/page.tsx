'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Line, Shape, Transformer } from 'react-konva';

interface Element {
  id: string;
  type: 'text' | 'line' | 'antline';
  x: number;
  y: number;
  text?: string;
  points?: number[];
  color?: string;
  animationSpeed?: number;
  animationDirection?: 'forward' | 'reverse' | 'alternate';
  width?: number;
  height?: number;
  rotation?: number;
}

const CanvasPage: React.FC = () => {
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingAntLine, setIsDrawingAntLine] = useState(false);
  const [currentLine, setCurrentLine] = useState<number[]>([]);
  const [animationOffset, setAnimationOffset] = useState(0);
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [debugMode, setDebugMode] = useState(false);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30); // seconds
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [transformStartData, setTransformStartData] = useState<{
    points: number[];
    centerX: number;
    centerY: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
  } | null>(null);

  // Load elements from localStorage on component mount
  useEffect(() => {
    const savedElements = localStorage.getItem('canvas-elements');
    if (savedElements) {
      try {
        setElements(JSON.parse(savedElements));
      } catch (error) {
        console.error('Failed to parse saved elements:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      if (elements.length > 0) {
        localStorage.setItem('canvas-elements', JSON.stringify(elements));
        setLastSaved(new Date());
      }
    }, autoSaveInterval * 1000);

    return () => clearInterval(autoSaveTimer);
  }, [elements, autoSaveInterval]);

  // Animation for marching ants effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset((prev) => {
        // Update animation based on selected element's direction
        const selectedElement = elements.find(el => el.id === selectedElementId);
        if (selectedElement?.type === 'antline') {
          const direction = selectedElement.animationDirection || 'forward';
          const speed = selectedElement.animationSpeed || 100;

          switch (direction) {
            case 'forward':
              return (prev + 1) % 20;
            case 'reverse':
              return (prev - 1 + 20) % 20;
            case 'alternate':
              return (prev + (prev < 10 ? 1 : -1) + 20) % 20;
            default:
              return (prev + 1) % 20;
          }
        }
        return (prev + 1) % 20;
      });
    }, elements.find(el => el.id === selectedElementId)?.animationSpeed || 100);
    return () => clearInterval(interval);
  }, [elements, selectedElementId]);

  // Theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Zoom functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          setZoomLevel(prev => Math.min(prev * 1.2, 5)); // Max zoom 500%
        } else if (e.key === '-') {
          e.preventDefault();
          setZoomLevel(prev => Math.max(prev / 1.2, 0.1)); // Min zoom 10%
        } else if (e.key === '0') {
          e.preventDefault();
          setZoomLevel(1); // Reset to 100%
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setZoomLevel(prev => Math.max(0.1, Math.min(5, prev * delta)));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Update transformer when selection changes
  useEffect(() => {
    if (selectedElementId && transformerRef.current && stageRef.current) {
      const selectedNode = stageRef.current.findOne(`#${selectedElementId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      } else {
        transformerRef.current.nodes([]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedElementId]);

  const addTextBox = () => {
    const newText: Element = {
      id: Date.now().toString(),
      type: 'text',
      x: 100,
      y: 100,
      text: 'New Text',
    };
    setElements([...elements, newText]);
  };

  const handleStageMouseDown = (e: any) => {
    // Only start selection if clicking on empty space and not drawing
    if (e.target === e.target.getStage() && !isDrawing && !isDrawingAntLine) {
      const pos = e.target.getStage().getPointerPosition();
      setSelectionStart(pos);
      setSelectionEnd(pos);
      setIsSelecting(true);
      setSelectedElementId(null);
      setSelectedElementIds([]);
      if (transformerRef.current) {
        transformerRef.current.nodes([]);
      }
    }
  };

  const handleStageMouseMove = (e: any) => {
    if (isSelecting) {
      const pos = e.target.getStage().getPointerPosition();
      setSelectionEnd(pos);
    }
  };

  const handleStageMouseUp = (e: any) => {
    if (isSelecting) {
      // Calculate selection bounds
      const minX = Math.min(selectionStart.x, selectionEnd.x);
      const maxX = Math.max(selectionStart.x, selectionEnd.x);
      const minY = Math.min(selectionStart.y, selectionEnd.y);
      const maxY = Math.max(selectionStart.y, selectionEnd.y);

      // Find elements within selection bounds
      const selectedIds: string[] = [];

      elements.forEach((el) => {
        let elMinX, elMaxX, elMinY, elMaxY;

        if (el.type === 'text') {
          // For text elements, use position and approximate size
          elMinX = el.x;
          elMaxX = el.x + 100; // Approximate text width
          elMinY = el.y;
          elMaxY = el.y + 20; // Approximate text height
        } else if (el.type === 'line' || el.type === 'antline') {
          // For lines, calculate bounding box from points
          const points = el.points || [];
          if (points.length >= 4) {
            let lineMinX = points[0], lineMaxX = points[0], lineMinY = points[1], lineMaxY = points[1];
            for (let i = 2; i < points.length; i += 2) {
              lineMinX = Math.min(lineMinX, points[i]);
              lineMaxX = Math.max(lineMaxX, points[i]);
              lineMinY = Math.min(lineMinY, points[i + 1]);
              lineMaxY = Math.max(lineMaxY, points[i + 1]);
            }
            elMinX = lineMinX;
            elMaxX = lineMaxX;
            elMinY = lineMinY;
            elMaxY = lineMaxY;
          } else {
            return; // Skip invalid lines
          }
        } else {
          return; // Skip unknown element types
        }

        // Check if element intersects with selection rectangle
        if (elMaxX >= minX && elMinX <= maxX && elMaxY >= minY && elMinY <= maxY) {
          selectedIds.push(el.id);
        }
      });

      setSelectedElementIds(selectedIds);
      setIsSelecting(false);

      // Update transformer with selected nodes
      if (selectedIds.length > 0 && transformerRef.current && stageRef.current) {
        const selectedNodes = selectedIds
          .map(id => stageRef.current.findOne(`#${id}`))
          .filter(node => node);
        transformerRef.current.nodes(selectedNodes);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  };

  const handleStageClick = (e: any) => {
    // If clicked on empty space and not selecting, deselect
    if (e.target === e.target.getStage() && !isSelecting) {
      setSelectedElementId(null);
      setSelectedElementIds([]);
      if (transformerRef.current) {
        transformerRef.current.nodes([]);
        transformerRef.current.getLayer().batchDraw();
      }
    }

    const pos = e.target.getStage().getPointerPosition();

    if (isDrawing) {
      if (currentLine.length === 0) {
        setCurrentLine([pos.x, pos.y]);
      } else {
        const newLine: Element = {
          id: Date.now().toString(),
          type: 'line',
          x: 0,
          y: 0,
          points: [...currentLine, pos.x, pos.y],
        };
        setElements([...elements, newLine]);
        setCurrentLine([]);
        setIsDrawing(false);
      }
    } else if (isDrawingAntLine) {
      if (currentLine.length === 0) {
        setCurrentLine([pos.x, pos.y]);
      } else {
        const newAntLine: Element = {
          id: Date.now().toString(),
          type: 'antline',
          x: 0,
          y: 0,
          points: [...currentLine, pos.x, pos.y],
        };
        setElements([...elements, newAntLine]);
        setCurrentLine([]);
        setIsDrawingAntLine(false);
      }
    }
  };

  const updateElementProperties = (id: string, properties: Partial<Element>) => {
    setElements(elements.map(el =>
      el.id === id ? { ...el, ...properties } : el
    ));
  };

  const handleTextEdit = (id: string, newText: string) => {
    setElements(elements.map(el => el.id === id ? { ...el, text: newText } : el));
  };

  const selectedElement = elements.find(el => el.id === selectedElementId);

  return (
    <div className={`w-full h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-slate-50 to-gray-100'
    }`}>
      <div className={`flex justify-center items-center space-x-3 p-6 backdrop-blur-sm border-b shadow-sm transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-800/80 border-gray-700/50'
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <button
          onClick={addTextBox}
          className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:bg-blue-600 active:scale-95"
        >
          Add Text
        </button>
        <button
          onClick={() => {
            setIsDrawing(!isDrawing);
            if (isDrawingAntLine) setIsDrawingAntLine(false);
          }}
          className={`px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 ${
            isDrawing
              ? 'bg-red-500 text-white hover:bg-red-600'
              : isDarkMode
                ? 'bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-gray-500'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
          }`}
        >
          {isDrawing ? 'Stop Line' : 'Draw Line'}
        </button>
        <button
          onClick={() => {
            setIsDrawingAntLine(!isDrawingAntLine);
            if (isDrawing) setIsDrawing(false);
          }}
          className={`px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 ${
            isDrawingAntLine
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : isDarkMode
                ? 'bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-gray-500'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
          }`}
        >
          {isDrawingAntLine ? 'Stop Ant Line' : 'Draw Ant Line'}
        </button>
        {selectedElement && (
          <button
            onClick={() => setShowPropertiesModal(true)}
            className="px-6 py-3 bg-purple-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:bg-purple-600 active:scale-95"
          >
            Properties
          </button>
        )}
        <button
          onClick={() => setDebugMode(!debugMode)}
          className={`px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 ${
            debugMode
              ? 'bg-green-500 text-white hover:bg-green-600'
              : isDarkMode
                ? 'bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-gray-500'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
          }`}
        >
          {debugMode ? 'Hide Debug' : 'Show Debug'}
        </button>
        <button
          onClick={() => setShowSettingsModal(true)}
          className={`px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 ${
            isDarkMode
              ? 'bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-gray-500'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
          }`}
        >
          ⚙️ Settings
        </button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight - 100}
        scaleX={zoomLevel}
        scaleY={zoomLevel}
        onClick={handleStageClick}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
        className="border"
      >
        <Layer>
          {elements.map((el) => {
            if (el.type === 'text') {
              return (
                <Text
                  key={el.id}
                  x={el.x}
                  y={el.y}
                  text={el.text}
                  fontSize={16}
                  fill="black"
                  draggable
                  onClick={() => setSelectedElementId(el.id)}
                  onDblClick={() => {
                    const textNode = stageRef.current.findOne(`#${el.id}`);
                    if (textNode) {
                      textNode.hide();
                      const textPosition = textNode.absolutePosition();
                      const stageBox = stageRef.current.container().getBoundingClientRect();
                      const areaPosition = {
                        x: stageBox.left + textPosition.x,
                        y: stageBox.top + textPosition.y,
                      };
                      const textarea = document.createElement('textarea');
                      document.body.appendChild(textarea);
                      textarea.value = el.text || '';
                      textarea.style.position = 'absolute';
                      textarea.style.top = areaPosition.y + 'px';
                      textarea.style.left = areaPosition.x + 'px';
                      textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
                      textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
                      textarea.style.fontSize = textNode.fontSize() + 'px';
                      textarea.style.border = 'none';
                      textarea.style.padding = '0px';
                      textarea.style.margin = '0px';
                      textarea.style.overflow = 'hidden';
                      textarea.style.background = 'none';
                      textarea.style.outline = 'none';
                      textarea.style.resize = 'none';
                      textarea.style.lineHeight = textNode.lineHeight();
                      textarea.style.fontFamily = textNode.fontFamily();
                      textarea.style.transformOrigin = 'left top';
                      textarea.style.textAlign = textNode.align();
                      textarea.style.color = textNode.fill();
                      const rotation = textNode.rotation();
                      let transform = '';
                      if (rotation) {
                        transform += 'rotateZ(' + rotation + 'deg)';
                      }
                      let px = 0;
                      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                      if (isFirefox) {
                        px += 2 + Math.round(textNode.fontSize() / 20);
                      }
                      transform += 'translateY(-' + px + 'px)';
                      textarea.style.transform = transform;
                      textarea.style.height = 'auto';
                      textarea.style.minHeight = textNode.height() - textNode.padding() * 2 + 5 + 'px';
                      textarea.focus();
                      function removeTextarea() {
                        textarea.parentNode?.removeChild(textarea);
                        window.removeEventListener('click', handleOutsideClick);
                        textNode.show();
                      }
                      function setTextareaWidth(newWidth: number) {
                        if (!newWidth) {
                          newWidth = textNode.placeholder ? textNode.placeholder.length * textNode.fontSize() : 0;
                        }
                        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                        if (isSafari || isFirefox) {
                          textarea.style.width = newWidth + 1 + 'px';
                        }
                        textarea.style.width = newWidth + 1 + 'px';
                      }
                      textarea.addEventListener('keydown', function (e) {
                        if (e.keyCode === 13 && !e.shiftKey) {
                          handleTextEdit(el.id, textarea.value);
                          removeTextarea();
                        }
                        if (e.keyCode === 27) {
                          removeTextarea();
                        }
                      });
                      textarea.addEventListener('keydown', function (e) {
                        const scale = textNode.getAbsoluteScale().x;
                        setTextareaWidth(textNode.width() * scale);
                        textarea.style.height = 'auto';
                        textarea.style.height = textarea.scrollHeight + 3 + 'px';
                      });
                      function handleOutsideClick(e: MouseEvent) {
                        if (e.target !== textarea) {
                          handleTextEdit(el.id, textarea.value);
                          removeTextarea();
                        }
                      }
                      setTimeout(() => {
                        window.addEventListener('click', handleOutsideClick);
                      });
                    }
                  }}
                  id={el.id}
                />
              );
            } else if (el.type === 'line') {
              return (
                <Line
                  key={el.id}
                  id={el.id}
                  points={el.points}
                  stroke="black"
                  strokeWidth={2}
                  draggable
                  onClick={() => setSelectedElementId(el.id)}
                />
              );
            } else if (el.type === 'antline') {
              // Calculate bounding box for the ant line
              const points = el.points || [];
              if (points.length >= 4) {
                let minX = points[0], maxX = points[0], minY = points[1], maxY = points[1];
                for (let i = 2; i < points.length; i += 2) {
                  minX = Math.min(minX, points[i]);
                  maxX = Math.max(maxX, points[i]);
                  minY = Math.min(minY, points[i + 1]);
                  maxY = Math.max(maxY, points[i + 1]);
                }
                // Ensure minimum clickable area
                const width = Math.max(maxX - minX, 20);
                const height = Math.max(maxY - minY, 20);

                return (
                  <Rect
                    key={el.id}
                    id={el.id}
                    x={minX}
                    y={minY}
                    width={width}
                    height={height}
                    fill="transparent"
                    stroke="transparent"
                    draggable
                    onClick={(e) => {
                      e.cancelBubble = true;
                      setSelectedElementId(el.id);
                    }}
                    onTap={(e) => {
                      e.cancelBubble = true;
                      setSelectedElementId(el.id);
                    }}
                    onDragStart={(e) => {
                      setDragStartPos({ x: minX, y: minY });
                    }}
                    onDragEnd={(e) => {
                      const rect = e.target;
                      const newX = rect.x();
                      const newY = rect.y();

                      if (dragStartPos) {
                        const deltaX = newX - dragStartPos.x;
                        const deltaY = newY - dragStartPos.y;

                        // Update all points in the ant line
                        const updatedPoints = points.map((point, index) => {
                          if (index % 2 === 0) {
                            // X coordinate
                            return point + deltaX;
                          } else {
                            // Y coordinate
                            return point + deltaY;
                          }
                        });

                        setElements(elements.map(element =>
                          element.id === el.id
                            ? { ...element, points: updatedPoints }
                            : element
                        ));
                      }

                      setDragStartPos(null);
                    }}
                  />
                );
              }
              return null;
            }
            return null;
          })}
          {isDrawing && currentLine.length > 0 && (
            <Line points={currentLine} stroke="red" strokeWidth={2} />
          )}
          {isDrawingAntLine && currentLine.length > 0 && (
            <Shape
              sceneFunc={(context, shape) => {
                context.beginPath();
                if (currentLine.length >= 4) {
                  context.moveTo(currentLine[0], currentLine[1]);
                  for (let i = 2; i < currentLine.length; i += 2) {
                    context.lineTo(currentLine[i], currentLine[i + 1]);
                  }
                }
                context.strokeStyle = '#007AFF';
                context.lineWidth = 3;
                context.setLineDash([8, 8]);
                context.lineDashOffset = -animationOffset;
                context.stroke();
                context.setLineDash([]);
              }}
            />
          )}
          {/* Render ant line visuals */}
          {elements.map((el) => {
            if (el.type === 'antline') {
              const points = el.points || [];
              if (points.length >= 4) {
                let minX = points[0], maxX = points[0], minY = points[1], maxY = points[1];
                for (let i = 2; i < points.length; i += 2) {
                  minX = Math.min(minX, points[i]);
                  maxX = Math.max(maxX, points[i]);
                  minY = Math.min(minY, points[i + 1]);
                  maxY = Math.max(maxY, points[i + 1]);
                }

                return (
                  <Shape
                    key={`visual-${el.id}`}
                    sceneFunc={(context, shape) => {
                      context.beginPath();
                      // Adjust points relative to the shape's position
                      context.moveTo(points[0], points[1]);
                      for (let i = 2; i < points.length; i += 2) {
                        context.lineTo(points[i], points[i + 1]);
                      }
                      context.strokeStyle = el.color || '#007AFF';
                      context.lineWidth = 3;
                      context.setLineDash([8, 8]);
                      context.lineDashOffset = -animationOffset;
                      context.stroke();
                      context.setLineDash([]);
                    }}
                  />
                );
              }
            }
            return null;
          })}
          {/* Debug Rectangles */}
          {debugMode && elements.map((el) => {
            let debugRect = null;

            if (el.type === 'text') {
              // Text elements: approximate clickable area
              debugRect = (
                <Rect
                  key={`debug-${el.id}`}
                  x={el.x}
                  y={el.y}
                  width={100}
                  height={20}
                  fill="rgba(255, 0, 0, 0.2)"
                  stroke="#FF0000"
                  strokeWidth={1}
                  dash={[3, 3]}
                />
              );
            } else if (el.type === 'line') {
              // Line elements: show line bounds
              const points = el.points || [];
              if (points.length >= 4) {
                let minX = points[0], maxX = points[0], minY = points[1], maxY = points[1];
                for (let i = 2; i < points.length; i += 2) {
                  minX = Math.min(minX, points[i]);
                  maxX = Math.max(maxX, points[i]);
                  minY = Math.min(minY, points[i + 1]);
                  maxY = Math.max(maxY, points[i + 1]);
                }
                const width = maxX - minX || 2;
                const height = maxY - minY || 2;

                debugRect = (
                  <Rect
                    key={`debug-${el.id}`}
                    x={minX}
                    y={minY}
                    width={width}
                    height={height}
                    fill="rgba(0, 255, 0, 0.2)"
                    stroke="#00FF00"
                    strokeWidth={1}
                    dash={[3, 3]}
                  />
                );
              }
            } else if (el.type === 'antline') {
              // Ant line elements: show calculated bounds with minimum size
              const points = el.points || [];
              if (points.length >= 4) {
                let minX = points[0], maxX = points[0], minY = points[1], maxY = points[1];
                for (let i = 2; i < points.length; i += 2) {
                  minX = Math.min(minX, points[i]);
                  maxX = Math.max(maxX, points[i]);
                  minY = Math.min(minY, points[i + 1]);
                  maxY = Math.max(maxY, points[i + 1]);
                }
                const width = Math.max(maxX - minX, 20);
                const height = Math.max(maxY - minY, 20);

                debugRect = (
                  <Rect
                    key={`debug-${el.id}`}
                    x={minX}
                    y={minY}
                    width={width}
                    height={height}
                    fill="rgba(0, 0, 255, 0.2)"
                    stroke="#0000FF"
                    strokeWidth={1}
                    dash={[3, 3]}
                  />
                );
              }
            }

            return debugRect;
          })}
          {/* Selection Rectangle */}
          {isSelecting && (
            <Rect
              x={Math.min(selectionStart.x, selectionEnd.x)}
              y={Math.min(selectionStart.y, selectionEnd.y)}
              width={Math.abs(selectionEnd.x - selectionStart.x)}
              height={Math.abs(selectionEnd.y - selectionStart.y)}
              fill="rgba(0, 122, 255, 0.1)"
              stroke="#007AFF"
              strokeWidth={1}
              dash={[5, 5]}
            />
          )}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Prevent negative width/height
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
            onTransformStart={(e) => {
              const selectedElement = elements.find(el => el.id === selectedElementId);
              if (selectedElement && selectedElement.type === 'antline') {
                const points = selectedElement.points || [];
                if (points.length >= 4) {
                  // Calculate bounding box center
                  let minX = points[0], maxX = points[0], minY = points[1], maxY = points[1];
                  for (let i = 2; i < points.length; i += 2) {
                    minX = Math.min(minX, points[i]);
                    maxX = Math.max(maxX, points[i]);
                    minY = Math.min(minY, points[i + 1]);
                    maxY = Math.max(maxY, points[i + 1]);
                  }
                  const centerX = (minX + maxX) / 2;
                  const centerY = (minY + maxY) / 2;

                  setTransformStartData({
                    points: [...points],
                    centerX,
                    centerY,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0
                  });
                }
              }
            }}
            onTransform={(e) => {
              const selectedElement = elements.find(el => el.id === selectedElementId);
              if (selectedElement && selectedElement.type === 'antline' && transformStartData) {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                const rotation = node.rotation();

                // Apply transformations to points
                const transformedPoints: number[] = [];

                for (let i = 0; i < transformStartData.points.length; i += 2) {
                  const x = transformStartData.points[i];
                  const y = transformStartData.points[i + 1];

                  // Translate to origin (center)
                  const translatedX = x - transformStartData.centerX;
                  const translatedY = y - transformStartData.centerY;

                  // Apply scale
                  const scaledX = translatedX * scaleX;
                  const scaledY = translatedY * scaleY;

                  // Apply rotation
                  const cos = Math.cos(rotation * Math.PI / 180);
                  const sin = Math.sin(rotation * Math.PI / 180);
                  const rotatedX = scaledX * cos - scaledY * sin;
                  const rotatedY = scaledX * sin + scaledY * cos;

                  // Translate back
                  const finalX = rotatedX + transformStartData.centerX;
                  const finalY = rotatedY + transformStartData.centerY;

                  transformedPoints.push(finalX, finalY);
                }

                // Update element temporarily for live preview
                const updatedElements = elements.map(el =>
                  el.id === selectedElementId
                    ? { ...el, points: transformedPoints }
                    : el
                );

                // Force re-render by updating state
                setElements(updatedElements);
              }
            }}
            onTransformEnd={(e) => {
              setTransformStartData(null);
            }}
          />
        </Layer>
      </Stage>

      {/* Properties Modal */}
      {showPropertiesModal && selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h2 className="text-xl font-semibold mb-4">Element Properties</h2>

            {selectedElement.type === 'antline' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <input
                    type="color"
                    value={selectedElement.color || '#007AFF'}
                    onChange={(e) => updateElementProperties(selectedElement.id, { color: e.target.value })}
                    className="w-full h-10 rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Animation Speed</label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={selectedElement.animationSpeed || 100}
                    onChange={(e) => updateElementProperties(selectedElement.id, { animationSpeed: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{selectedElement.animationSpeed || 100}ms</div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Animation Direction</label>
                  <select
                    value={selectedElement.animationDirection || 'forward'}
                    onChange={(e) => updateElementProperties(selectedElement.id, { animationDirection: e.target.value as any })}
                    className={`w-full p-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="forward">Forward</option>
                    <option value="reverse">Reverse</option>
                    <option value="alternate">Alternate</option>
                  </select>
                </div>
              </div>
            )}

            {selectedElement.type === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Text</label>
                  <textarea
                    value={selectedElement.text || ''}
                    onChange={(e) => updateElementProperties(selectedElement.id, { text: e.target.value })}
                    className={`w-full p-2 rounded-lg border resize-none ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Font Size</label>
                  <input
                    type="number"
                    min="8"
                    max="72"
                    value={16} // This would need to be stored in the element
                    onChange={(e) => {/* Update font size */}}
                    className={`w-full p-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPropertiesModal(false)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPropertiesModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h2 className="text-xl font-semibold mb-4">Canvas Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Auto-Save Interval</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="10"
                    value={autoSaveInterval}
                    onChange={(e) => setAutoSaveInterval(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-center">{autoSaveInterval}s</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Auto-save every {autoSaveInterval} seconds
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Last Saved</label>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {lastSaved ? new Date(lastSaved).toLocaleString() : 'Never'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Canvas Info</label>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {elements.length} elements • Zoom: {Math.round(zoomLevel * 100)}%
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    localStorage.setItem('canvas-elements', JSON.stringify(elements));
                    setLastSaved(new Date());
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                >
                  Save Now
                </button>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasPage;
