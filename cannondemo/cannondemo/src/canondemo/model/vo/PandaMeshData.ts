module rightpanda {
    export class PandaMeshData {
        public type: number;
        public key: number   //1帮2助3皮4分享6关卡7榜8看录像
        public url: string;
        public txt: string
        public data: any;
        public static type1: number = 1;
        //public static type2: number = 2;

        public static key1: number = 1;  //帮助列表
        public static key2: number = 2; //被别人帮助 
        public static key3: number = 3;  //皮肤
        public static key4: number = 4;  //邀请分享好友列表
        public static key5: number = 5;  //点击请求帮助
        public static key6: number = 6;  //全榜列表
        public static key7: number = 7;  //特殊关卡
        public static key8: number = 8;  //视屏奖励
        public static key9: number = 9;  //领取分享奖励
        public static key10: number = 10;  //给于的奖励需要点击领取
        public static key11: number = 11;  //无尽模式
        public static key13: number = 13;  //联机夺宝
        public static key14: number = 14;  //任务系统
        public static key15: number = 15;  //抽奖
        public static key16: number = 16;  //宝箱
        public static key17: number = 17;  //特效皮肤
 
      
      
     

        public static key101: number = 101;  //请求帮助
        public static key102: number = 102;  //正在播放录像
        public static key103: number = 103;   //正在回放录像
        public static key104: number = 104;   //引导提示
 
        public static key105: number = 105;   //在正帮助别人
        public static key106: number = 106;   //等待好友加入获取魔法




        private static speenid: number = 0;
        public id: number;
        public constructor() {

 
            PandaMeshData.speenid++
            this.id = PandaMeshData.speenid
        }

        public static showCentenTxtInfoType($key: number, $txt: any, $data: any = null): void {
            var $pandaMeshData: PandaMeshData = new PandaMeshData();
            $pandaMeshData.key = $key;
            $pandaMeshData.txt = $txt;
            $pandaMeshData.data = $data
            GameData.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.SHOW_CENTEN_INFO_TXT), $pandaMeshData)


        }
        public static showRightPanda($key: number, $url: string, $evt: any = null): void {

            var obj: PandaMeshData = new PandaMeshData();
            obj.url = $url;
            obj.key = $key;
            obj.type = PandaMeshData.type1;
            obj.data = $evt;
        
            GameData.dispatchEvent(new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_PANDA_INFO), obj);

        }

        public static hideCentenTxtInfoType2($key: number): void {
            var $pandaMeshData: PandaMeshData = new PandaMeshData();
            $pandaMeshData.key = $key;
            GameData.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.HIDE_CENTEN_INFO_TXT), $pandaMeshData)
        }
    }
}