import React, { useRef, useEffect, useState } from 'react';
import './scss/Paint.scss';
import Window from './Window';

const Paint = (props) => {
    const [selectedColor, setSelectedColor] = useState('000000');
    const [tool, setTool] = useState('pencil');
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setbrushSize] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parentWidth = canvas.parentElement.clientWidth;
        const parentHeight = canvas.parentElement.clientHeight;

        // Устанавливаем размер канваса равным размеру родителя
        canvas.width = parentWidth;
        canvas.height = parentHeight;

        const context = canvas.getContext('2d');
        contextRef.current = context;
        contextRef.current.fillStyle = 'white';
        contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (event) => {
        setIsDrawing(true);
        draw(event);
    };

    const endDrawing = () => {
        setIsDrawing(false);
        contextRef.current.beginPath(); // Сбрасываем путь
    };

    const draw = (event) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX ? event.clientX - rect.left : getTouchPosition(event).x; // Используем клиентские координаты или координаты касания
        const y = event.clientY ? event.clientY - rect.top : getTouchPosition(event).y; // Используем клиентские координаты или координаты касания

        contextRef.current.strokeStyle = `#${tool === 'eraser' ? 'fff' : selectedColor}`;
        contextRef.current.lineWidth = (tool === 'brush' || tool === 'eraser') ? brushSize : 1; // Разная ширина для кисти и карандаша
        contextRef.current.lineCap = 'round';

        // if (tool === 'eraser') {
        //     contextRef.current.globalCompositeOperation = 'destination-out';
        // } else {
        // }
        contextRef.current.globalCompositeOperation = 'source-over';

        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
    };

    const getTouchPosition = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0];
        return {
            x: touch.clientX - rect.left, // Получаем координаты касания
            y: touch.clientY - rect.top,   // Получаем координаты касания
        };
    };

    const resetCanvas = () => {
        contextRef.current.fillStyle = 'white';
        contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const downloadCanvas = () => {
        const link = document.createElement('a');
        link.download = 'myDrawing.png';
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
    };

    return (
        <Window type="paint">
            <div className='Paint'>
                <div className='Paint_buttons'>
                    <div className='Paint_button' onClick={downloadCanvas}>
                        <span>D</span>ownload
                    </div>
                    <div className='Paint_button' onClick={resetCanvas}>
                        <span>R</span>eset
                    </div>
                </div>
                <div className='Paint_content'>
                    <div className='Paint_tools window'>
                        <div className={`Paint_tool window ${tool === 'pencil' && 'Paint_tool_selected'}`} onClick={() => { setTool('pencil') }}>
                            <img src='/img/paint/p.png' alt='decor' />
                        </div>
                        <div className={`Paint_tool window ${tool === 'eraser' && 'Paint_tool_selected'}`} onClick={() => { setTool('eraser') }}>
                            <img src='/img/paint/e.png' alt='decor' />
                        </div>
                        <div className={`Paint_tool window ${tool === 'brush' && 'Paint_tool_selected'}`} onClick={() => { setTool('brush') }}>
                            <img src='/img/paint/b.png' alt='decor' />
                        </div>
                        {
                            (tool === 'brush' || tool === 'eraser') &&
                            <div className='Paint_bs'>
                                <img src='/img/paint/large.png' className='Paint_bs_large' alt='decor' />
                                <div className="is-vertical">
                                    <input id="range28" className="has-box-indicator" type="range" min="2" max="20" step="1"
                                        onChange={(e) => setbrushSize(e.target.value)} value={brushSize} />
                                </div>
                                <img src='/img/paint/large.png' className='Paint_bs_small' alt='decor' />
                            </div>
                            // <div className='Paint_sizeSelector'>
                            //     Meow
                            // </div>
                        }
                    </div>
                    <div className='Paint_field'>
                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseUp={endDrawing}
                            onMouseMove={draw}
                            onTouchStart={startDrawing}
                            onTouchEnd={endDrawing}
                            onTouchMove={draw}
                            style={{ width: '100%', height: '100%', minHeight: '300px', backgroundColor: 'white' }}
                        />
                    </div>
                </div>
                <div className='Paint_colors window'>
                    <div className='Paint_colors_selected window'>
                        <div className='Paint_colors_selected_inner window' style={{ background: `#${selectedColor}` }} ></div>
                    </div>
                    <div className='Paint_colors_list Paint_colors_list_pc'>
                        <div className='Paint_colors_row'>
                            {['000000', '87888F', 'A80057', 'A8A857', '00A857', '57A8A8', '0000A8', 'A857A8', '959675', '336363', '0071FF', '284EA8', '2300FF', 'A85757'].map((color) => (
                                <div
                                    key={color}
                                    className='Paint_colors_el window'
                                    style={{ background: `#${color}` }}
                                    onClick={() => { setSelectedColor(color) }}
                                />
                            ))}
                        </div>
                        <div className='Paint_colors_row'>
                            {['FFFFFF', 'C0C7C8', 'FF0000', 'FFFF00', '00FF00', '00FFFF', '0000FF', 'FF00FF', 'FFFF81', '00FF81', '8AFFFF', '7979FF', 'FF0087', 'FF7648'].map((color) => (
                                <div
                                    key={color}
                                    className='Paint_colors_el window'
                                    style={{ background: `#${color}` }}
                                    onClick={() => { setSelectedColor(color) }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='Paint_colors_list Paint_colors_list_mob'>


                        <div className='Paint_colors_row'>
                            {['FFFFFF', '000000', '313131', '575757', '87888F', 'C0C7C8', 'FF0000', 'FFFF00', '00FF00', '00FFFF', '0000FF', 'FF00FF', 'FFFF81', '00FF81', '8AFFFF', '7979FF', 'FF0087', 'FF7648', 'A80057', 'A8A857', '00A857', '57A8A8', '0000A8', 'A857A8', '959675', '336363', '0071FF', '284EA8', '2300FF', 'A85757'].map((color) => (
                                <div
                                    key={color}
                                    className='Paint_colors_el window'
                                    style={{ background: `#${color}` }}
                                    onClick={() => { setSelectedColor(color) }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default Paint;
