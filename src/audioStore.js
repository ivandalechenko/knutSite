import { makeAutoObservable, observable } from 'mobx';

class AudioStore {
    volume = 30
    currentSongIndex = 0;
    position = 0;
    newPos = -1
    play = false;
    songs = [
        "/music/Candy Shop - 50 Cent.mp3",
        "/music/American Boy (feat. Kanye West) - Estelle.mp3",
        "/music/A Thousand Miles - Vanessa Carlton.mp3",
        "/music/Ab in Den Süden - Buddy.mp3",
        "/music/All The Things She Said - t.A.T.u..mp3",
        "/music/Around the World (La La La La La) - Radio Version - A Touch Of Class.mp3",
        "/music/Be My Lover - La Bouche.mp3",
        "/music/Beautiful - Snoop Dogg.mp3",
        "/music/Because I Got High - Afroman.mp3",
        "/music/Blue (Da Ba Dee) - Gabry Ponte Ice Pop Radio - Eiffel 65.mp3",
        "/music/Butterfly - Crazy Town.mp3",
        "/music/Cry Me a River - Justin Timberlake.mp3",
        "/music/Crying at the Discoteque - Radio Edit - Alcazar.mp3",
        "/music/Don't Stop The Music - Rihanna.mp3",
        "/music/Everytime We Touch - Radio Edit - Cascada.mp3",
        "/music/Hamma! - Single Edit - Culcha Candela.mp3",
        "/music/Hips Don't Lie (feat. Wyclef Jean) - Shakira.mp3",
        "/music/I'll Be Missing You (feat. Faith Evans, 112) - Diddy.mp3",
        "/music/In Da Club - 50 Cent.mp3",
        "/music/Lonely - Akon.mp3",
        "/music/Low (feat. T-Pain) - Flo Rida.mp3",
        "/music/Milkshake - Kelis.mp3",
        "/music/Ms. Jackson - Outkast.mp3",
        "/music/Numb - Linkin Park.mp3",
        "/music/One More Time - Daft Punk.mp3",
        "/music/Oops!...I Did It Again - Britney Spears.mp3",
        "/music/Promiscuous - Nelly Furtado.mp3",
        "/music/Relax, Take It Easy - MIKA.mp3",
        "/music/savernames.js",
        "/music/SexyBack (feat. Timbaland) - Justin Timberlake.mp3",
        "/music/SOS - Radio Edit - Rihanna.mp3",
        "/music/Stronger - Kanye West.mp3",
        "/music/Summer Jam - Radio Edit - The Underdog Project.mp3",
        "/music/Toxic - Britney Spears.mp3",
        "/music/Waka Waka (This Time for Africa) (feat. Freshlyground) - Shakira.mp3",
        "/music/When Love Takes Over (feat. Kelly Rowland) - David Guetta.mp3",
        "/music/Without Me - Eminem.mp3"
    ]
    constructor() {
        makeAutoObservable(this);
    }

    setVolume(vol) {
        if (vol <= 100) {
            if (vol >= 0) {
                this.volume = vol
            } else {
                this.volume = 0
            }
        } else {
            this.volume = 100
        }
    }
    setPosition(pos) {
        if (pos <= 100) {
            if (pos >= 0) {
                this.position = pos
            } else {
                this.position = 0
            }
        } else {
            this.position = 100
        }
    }

    nextSong() {
        if (this.currentSongIndex + 1 < this.songs.length) {
            this.currentSongIndex = this.currentSongIndex + 1
        } else {
            this.currentSongIndex = 0
        }
        this.newPos = 0 + Math.random() / 10
    }
    prevSong() {
        if (this.currentSongIndex - 1 > 0) {
            this.currentSongIndex = this.currentSongIndex - 1
        } else {
            this.currentSongIndex = this.songs.length
        }
        this.newPos = 0 + Math.random() / 10

    }



}

export default new AudioStore();