import { useEffect, useState } from 'react';
import './scss/ChangeWallpaper.scss';
import Window from './Window';
import wallpaperStore from './WallpaperStore';
export default () => {
    const [wallpaper, setwallpaper] = useState(localStorage.getItem('wallpaper') || 1);
    useEffect(() => {
        localStorage.setItem('wallpaper', wallpaper)
        wallpaperStore.wallpaper = wallpaper;
    }, [wallpaper])

    return (
        <Window type="changeWallpaper">
            <div className='ChangeWallpaper'>
                <div className='ChangeWallpaper_reset' onClick={() => { setwallpaper(1) }}>
                    <span>
                        R
                    </span>
                    eset to default
                </div>
                <div className={`ChangeWallpaper_content window`}>
                    <div className={`ChangeWallpaper_element ${Number(wallpaper) === 1 ? 'window_inner' : 'window'}`} onClick={() => { setwallpaper(1) }}>
                        <div className='ChangeWallpaper_element_inner window_inner'>
                            <img src="/img/wallpapers/1.png" alt="" />
                        </div>
                        1
                    </div>
                    <div className={`ChangeWallpaper_element ${Number(wallpaper) === 2 ? 'window_inner' : 'window'}`} onClick={() => { setwallpaper(2) }}>
                        <div className='ChangeWallpaper_element_inner window_inner'>
                            <img src="/img/wallpapers/2.png" alt="" />
                        </div>
                        2
                    </div>
                    <div className={`ChangeWallpaper_element ${Number(wallpaper) === 3 ? 'window_inner' : 'window'}`} onClick={() => { setwallpaper(3) }}>
                        <div className='ChangeWallpaper_element_inner window_inner'>
                            <img src="/img/wallpapers/3.png" alt="" />
                        </div>
                        3
                    </div>
                    <div className={`ChangeWallpaper_element ${Number(wallpaper) === 4 ? 'window_inner' : 'window'}`} onClick={() => { setwallpaper(4) }}>
                        <div className='ChangeWallpaper_element_inner window_inner'>
                            <img src="/img/wallpapers/4.png" alt="" />
                        </div>
                        4
                    </div>
                </div>
            </div>
        </Window>
    )
}