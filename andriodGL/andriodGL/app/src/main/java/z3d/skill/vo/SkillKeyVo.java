package z3d.skill.vo;

import z3d.vo.DataObjTempVo;

public class SkillKeyVo {
    public float frame  = 0;
    public String url;

    public void setData(DataObjTempVo $data) {
        this.frame = $data.frame;
        this.url = $data.url;
    }
}
