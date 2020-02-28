

var keyProp: Array<string> = [
    "生命", "攻击", "防御", "命中", "闪避", "暴击", "抗暴", "攻速", "移速", "破防", "忽视闪避", "生命值回复", "伤害加深", "伤害减免", "反弹伤害"//15个
    , "吸血", "回复效率", "暴击", "抗暴", "暴击伤害", "暴伤减免", "命中率", "闪避率", "眩晕", "定身", "沉默", "混乱", "魅惑", "控制增强", "控制减免"//15个
    , "防御"
];
function getKeyProById($id: number): string {
    return keyProp[$id - 1];
}

// function getKeyCostById($id: number): string {
//     return TableData.getInstance().getData(TableData.tb_item_template,$id)["name"];
// }

//消耗类资源名
function getResName($id: number): string {
    return TableData.getInstance().getData(TableData.tb_item_template, $id)["name"];
}

var btnClickTime: number = 300;

var professionalKey: Array<string> = [
    "", "枪客", "枪客", "道士", "道士", "剑客", "剑客"
];
function getProfessional($type: number): string {
    return professionalKey[$type];
}

var quaColorAry: Array<string> = [ColorType.White9A683F, ColorType.color2daa35, ColorType.color4392ff, ColorType.colorb759ff, ColorType.colorff7200, ColorType.colorce0a00];
function getColorQua(qua: number): string {
    return this.quaColorAry[qua]
}



function getRoleUrl(name: string): string {
    // if (name.search("2242") != -1) {
    //     console.log("2242224222422242")
    // }
    // if (name == "0") {
    //     console.log("没有这个装备")
    // }
    return "role/" + name + getBaseUrl() + ".txt";
}

function getRoleUIUrl(name: string): string {
    // if (name.search("6013") != -1) {
    //     console.log("6013")
    // }
    // if (name == "0") {
    //     console.log("没有这个装备")
    // }
    return "role/ui/" + name + getBaseUrl() + ".txt";
}


function getSkillUrl(name: string): string {
    if (!name || name.length == 0) {
        console.log("没有技能")
    }
    var str: string = "skill/" + name + getBaseUrl() + ".txt";
    return str.replace(".txt", "_byte.txt")
}

function getModelUrl(name: string): string {
    return "model/" + name + getBaseUrl() + ".txt";
}

function getModelUIUrl(name: string): string {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getMapUrl(name: string): string {
    return "map/" + name + ".txt";
}

function getfactionmapUrl(name: number): string {
    return "ui/load/map/world/" + name + ".png";
}
function getZipMapUrl(name: string): string {
    return "map/" + name + "/";
}
function getactivityIconUrl(name: string): string {
    return "ui/load/activity/icon/" + name + ".jpg";
}
//玩家头像
function getTouPic(gender: number): string {
    // return gender == 1 ? "ui/tou/1.png" : "ui/tou/2.png";
    return "ui/tou/" + (gender % 2) + ".png";
}

function getVipIconUrl(name: number): string {
    return "ui/load/Vip/" + name + ".png";
}

function getExteriorIconUrl(name: number): string {
    return "ui/load/exterior/" + name + ".png";
}

function getFactionBuildMapUrl(name: number): string {
    return "ui/load/map/factionbuildmap/" + name + ".png";
}


function geteqiconIconUrl(name: string): string {
    return "ui/eqicon/" + name + ".png";
}

function getstrongerIconUrl(name: string): string {
    return "ui/load/stronger/" + name + ".png";
}

function getgemIconUrl(name: number): string {
    return "ui/load/gem/" + name + ".png";
}

function getRoleIconUrl(name: string): string {
    return "ui/roleicon/" + name + ".png";
}
function getKaifuIconUrl(name: string): string {
    return "ui/load/kaifu/" + name + ".png";
}
function getTeamcopyIconUrl(name: string): string {
    return "ui/load/teamcopy/" + name + ".png";
}
function getSuccesspromptUrl(name: string): string {
    return "ui/load/toptip/txt/" + name + ".png";
}
function getSkillIconUrl(name: string): string {
    return "ui/skillicon/" + name + ".png";
}
function getEffectUIUrl(name: string): string {
    return "ui/load/effect/" + name + ".png";
}
function getMountIconUrl(name: string): string {
    return "ui/load/mount/photo/" + name + ".png";
}
function getload_IconUrl(name: string): string {
    return "ui/load/icon/" + name + ".png";
}
function getload_FacBuildUrl(name: string): string {
    return "ui/load/faction/buildicon/" + name + ".png";
}
function getload_LogingiftUrl(name: string): string {
    return "ui/load/Logingift/Name/" + name + ".png";
}
function getload_LogingiftInfoUrl(name: string): string {
    return "ui/load/Logingift/Info/" + name + ".png";
}
function getUIIconUrl(name: string): string {
    return "ui/uiicon/" + name + ".png";
}
function getQueenIconUrl(id: number): string {
    return Scene_data.fileRoot + "ui/load/queen/" + id + ".jpg";
}

function getUItimeOutUrl(name: string): string {
    return "ui/load/timeOut/" + name + ".png"
}
function getUIpkGradeUrl(name: string): string {
    return "ui/load/pkGrade/" + name + ".png"
}
function getUItittleUrl(name: string): string {

    return "ui/load/tittle/" + name + ".png";
}
function getOutBossUiUrl(name: string, pre: boolean): string {
    if (pre) {
        return "ui/tittlename/oboss/t_" + name + ".png";
    } else {
        return "ui/tittlename/oboss/" + name + ".png";
    }

}
/**前端战斗力计算 */
function getForceByAtt(att_id: Array<number>, att_val: Array<number>): number {
    var num: number = 0;
    for (var i: number = 0; i < att_val.length; i++) {
        num += tb.TB_battle_force.get_TB_battle_forceById(att_id[i]).rate * att_val[i];
    }
    console.log("---NAN--", float2int(num / 1000000));
    return float2int(num / 1000000);
}

/**标准化数字 */
function Snum($num: number): string {
    if ($num > 999999) {
        return float2int($num / 10000) + "万";
    } else if ($num > 999999999) {
        return float2int($num / 100000000) + "亿";
    } else {
        return String(float2int($num));
    }
}

/** 获得vip加成 */
function getvipadd($idstr: string):string {
    var viptabary: Array<tb.TB_vip_base> = tb.TB_vip_base.getTB_vip_base();
    var curviprare: number = viptabary[GuidData.player.getVipLevel()][$idstr];
    for (var i = GuidData.player.getVipLevel(); i < viptabary.length; i++) {
        var element: tb.TB_vip_base = viptabary[i];
        if (curviprare != element[$idstr]) {
            console.log("----",curviprare,$idstr);
            return "VIP"+element.id+"结算奖励增加"+element[$idstr]+"%";
        }
    }
    console.log("----",curviprare,$idstr);
    return "结算奖励增加"+viptabary[viptabary.length - 1][$idstr]+"%";
}


function converItem2Cost(ary: Array<number>): Array<number> {
    var m: number = TableData.getInstance().getData(TableData.tb_item_template, ary[0])["money_type"];
    return [m, ary[1]];
}
/**将道具中的资源类，转换为消耗资源id */
function getresIdByreward($itemid: number): number {
    return $itemid;
}

/**将后台名称 2.1001.张三 解析成 1001.张三  跨服使用 */
function getServerAndName(name: string): string {
    var ary: Array<string> = name.split(",");
    if (ary.length == 3) {
        return ary[1] + ary[2];
    } else {
        return name;
    }
}


/**将后台名称 2.1001.张三 解析成 张三 */
function getBaseName(name: string): string {
    var ary: Array<string> = name.split(",");
    if (ary.length == 3) {
        return ary[2];
    } else {
        return name;
    }
}

function getAvataByID($id): number {
    var $aa: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($id)
    return $aa.avatar
}
// /**资源是否足够 -道具模式 */
// function hasEnoughResItem($costary: Array<number>): boolean {
//     return hasEnoughRes([getresIdByreward($costary[0]), $costary[1]])
// }
/**资源是否足够 */
function hasEnoughRes($costary: Array<number>): boolean {
    return ($costary[1] <= GuidData.player.getResType($costary[0]));
}
function costRes($costary: Array<number>,fun:Function,failFun:Function=null):void{
   
}
// /**
//  * 道具或者资源是否足够
//  * @param  $costary道具数组
//  */
function hasEnoughResItem($costary: Array<number>): boolean {
   
    return false

}

