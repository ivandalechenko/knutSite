import { useEffect, useState } from 'react';
import './scss/ChangeWallpaper.scss';
import Window from './Window';
import wallpaperStore from './wallpaperStore';
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
                    {
                        Array.from({ length: 29 }, (_, index) => {
                            return <div className={`ChangeWallpaper_element ${Number(wallpaper) === index + 1 ? 'window_inner' : 'window'}`} onClick={() => { setwallpaper(index + 1) }}>
                                <div className='ChangeWallpaper_element_inner window_inner'>
                                    <img src={`/img/wallpapers/${index + 1}-min.webp`} alt="" />
                                </div>
                                {index + 1}
                            </div>
                        })
                    }

                </div>
            </div>
        </Window>
    )
}