module game {
    import BaseEvent = Pan3d.BaseEvent
    export class SceneEvent extends BaseEvent {
        public static INIT_SCENE_CONFIG: string = "INIT_SCENE_CONFIG";
        public static SELECT_SCENE_LEVEL: string = "SELECT_SCENE_LEVEL";
        public static GAME_LEVE_UP: string = "GAME_LEVE_UP";
        public static GAME_LEVE_LOST: string = "GAME_LEVE_LOST";
        public static WX_GET_FRIEND_CLOUD_STORAGE: string = "WX_GET_FRIEND_CLOUD_STORAGE";
   

        public static DIAMONDS_SPRITE_HIT_EVENT: string = "DIAMONDS_SPRITE_HIT_EVENT";

        public static ON_SHARE_APP_MESSAGE: string = "ON_SHARE_APP_MESSAGE";
        public static WX_ON_SHOW: string = "WX_ON_SHOW";
 
        public static WX_SAVE_LEVEL_START_BMP_TO_SHARE: string = "WX_SAVE_LEVEL_START_BMP_TO_SHARE";
        public static WX_GAME_UPDATA_EVENT: string = "WX_GAME_UPDATA_EVENT";
        public static WX_CREATE_USER_INFO_BUTTON: string = "WX_CREATE_USER_INFO_BUTTON"
        public static WEB_SEVER_EVENT_AND_BACK: string = "WEB_SEVER_EVENT_AND_BACK"
        public static SAVE_VIDEO_FILE_TO_WEB: string = "SAVE_VIDEO_FILE_TO_WEB"
        public static WEB_SAVE_SAMPE_FILE_BACK_NAME: string = "WEB_SAVE_SAMPE_FILE_BACK_NAME"
        
        public static SEND_TO_APPER_DATA: string = "SEND_TO_APPER_DATA"; 
        public static SHOW_SPECIAL_EFFECT: string = "SHOW_SPECIAL_EFFECT";
        public static DIAMONDS_CHANGE_EVENT: string = "DIAMONDS_CHANGE_EVENT"

        public static REMOVE_USER_STORAGE_INFO: string  = "REMOVE_USER_STORAGE_INFO"

        public static WX_RECORDER_START_EVENT: string  = "WX_RECORDER_START_EVENT"
        public static WX_RECORDER_END_EVENT: string = "WX_RECORDER_END_EVENT"


        public static WX_LOOK_VIDEO_VD_EVENT: string = "WX_LOOK_VIDEO_VD_EVENT"
        public static WX_SHOW_TOAST_MSG: string = "WX_SHOW_TOAST_MSG"

        public static MINI_GAME_NEED_UPDATA_EVENT: string = "MINI_GAME_NEED_UPDATA_EVENT"

         

        public static Refresh_share_Canvas_to_Texture: string = "Refresh_share_Canvas_to_Texture";


        public static ALL_SHARE_SCENE_ONLY_EVENT: string = "ALL_SHARE_SCENE_ONLY_EVENT"  //开始统一分享机制


 
 
        public levelNum: number

    }


}