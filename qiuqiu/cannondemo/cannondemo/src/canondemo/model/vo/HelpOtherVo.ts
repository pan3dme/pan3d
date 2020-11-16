class HelpOtherVo   {
    public level: number
    public openid: string 
    public state: number
    public time: number
    public user_info: string
    public userAvatarUrl: string
    public userNickName: string
    public helper_info: string
    public helpAvatarUrl: string
    public helpNickName: string
    public meshObj(value): void {
        this.level = value.level
        this.openid = value.openid
        this.state = value.state
        this.time = value.time
        this.user_info = value.user_info
        this.helper_info = value.helper_info

        if (this.user_info) {
            this.userNickName = this.user_info.split("|")[0];
            this.userAvatarUrl = this.user_info.split("|")[1];
        }
        if (this.user_info) {
            this.helpNickName = this.helper_info.split("|")[0];
            this.helpAvatarUrl = this.helper_info.split("|")[1];

        }

        
    }
}