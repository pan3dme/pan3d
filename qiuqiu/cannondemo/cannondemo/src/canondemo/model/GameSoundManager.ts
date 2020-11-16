module game {
    import Vector3D = Pan3d.Vector3D;
    import Scene_data = Pan3d.Scene_data;
    import TimeUtil = Pan3d.TimeUtil;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    export class GameSoundManager {
        private static _instance: GameSoundManager;
        public static getInstance(): GameSoundManager {
            if (!GameSoundManager._instance) {
                GameSoundManager._instance = new GameSoundManager();
            }
            return GameSoundManager._instance;
        }
        public audio: any
        private _volume: number = 1.0;
        constructor() {
            this.resetAudio()
            this.musicDid = {}
        }
        public makeBaseSound(value: string): any {
            let temp = new Audio(value)
            temp.loop = true;
            temp.play();
            return temp;
        }
       
        private musicDid: any
        public playSoundByName(value: string): void {
            if (!GameData.getStorageSync("o_volume_but")) {
                if (!this.musicDid[value]) {
                    var $url: string = value
                    $url = GameData.getLoadFileIsLocalUrl($url);
                    let temp = new Audio($url)
                    temp.onerror = () => {
                        Pan3d.TimeUtil.addTimeOut(2000, () => {
                            temp.src = $url
                        })
                    }
                    this.musicDid[value] = temp
                }
                this.musicDid[value].play();
            }
        }
        public playHitSound(value: number): void {

        }
        public collidehit(): void {
            //当前时间大于上次碰撞变化的100ms
            if (TimeUtil.getTimer() > this.contactsLinkTm) {
                this.contactsLinkTm = TimeUtil.getTimer()+200
                if (!GameData.getStorageSync("o_shake_but")) {
                    this.playHitSound(1);
                      console.log("碰到", this.lastcontactsNum, TimeUtil.getTimer())
                }
            }
         
        }
        private lastcontactsNum: number = 0;
        public resetAudio(): void {
            var $url: string = Scene_data.fileRoot + "sound/bgm001.mp3"
            $url = GameData.getLoadFileIsLocalUrl($url);
            if (!this.audio) {
                this.audio = this.makeBaseSound($url);
            } else {
                this.changeBgUrl();
            }   
            if (GameData.getStorageSync("o_volume_but")) {
                this.audio.volume = 0
            } else {
                this.audio.volume = 0.8
            }
        }
        public changeBgUrl(): void {
            if (this.audio) {
                var $soundItem: Array<string> = new Array;
                $soundItem.push("sound/bgm001.mp3");
                $soundItem.push("sound/bgm002.mp3");
                var $url: string = Scene_data.fileRoot + $soundItem[random($soundItem.length)]
                this.audio.src = GameData.getLoadFileIsLocalUrl($url)
                if (GameData.getStorageSync("o_volume_but")) {
                    this.audio.volume = 0
                } else {
                    this.audio.volume = 0.8
                }
            }
            
        }
        public getBgVolume(): number {
            if (this.audio) {
                return this.audio.volume
            } else {
                return 0
            }
   
        }
        public setBgVolume(value: number): void {
            if (this.audio) {
                this.audio.volume = value
            }
   
        }
        private contactsLinkTm: number=0
        public upFrame(): void {
            /*
            if (GameData.getStorageSync("o_volume_but")) {
                this.audio.volume = 0
            } else {

                var $mainBody: CANNON.Body = GameDataModel.centenBall.body;
                var $velocity: Vector3D = new Vector3D($mainBody.velocity.x, $mainBody.velocity.y, $mainBody.velocity.z);
                var $isHitSound: boolean = false;

                for (var i: number = 0; i < canonkey.Physics.world.contacts.length; i++) {
                    var $vo: CANNON.ContactEquation = canonkey.Physics.world.contacts[i];
                    if ($vo.bi == $mainBody || $vo.bj == $mainBody) {
                        $isHitSound = true;
                        GameDataModel.lastMainHitTm = TimeUtil.getTimer();
                    }
                }
                if (this.lastcontactsNum != canonkey.Physics.world.contacts.length) {
                    this.lastcontactsNum = canonkey.Physics.world.contacts.length;
                    this.contactsLinkTm = TimeUtil.getTimer()+150
                }
                if ($isHitSound) {
                    var $dis: number = $velocity.dot($velocity);
                    $dis = Math.min(1, Math.max(0, Math.sqrt($dis) / 30));
                    this.audio.volume = $dis*0.5
                } else {
                    this.audio.volume = 0
                }
               // this.audio.volume=1
            
            }
            */

        }

    }
}