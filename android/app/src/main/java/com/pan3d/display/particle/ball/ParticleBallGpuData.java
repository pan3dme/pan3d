package com.pan3d.display.particle.ball;

import com.pan3d.display.particle.ParticleGpuData;
import com.pan3d.scene.Scene3D;

import java.nio.FloatBuffer;
import java.util.List;

public class ParticleBallGpuData extends ParticleGpuData {

    public Float[] basePos;
    public FloatBuffer basePosBuffer;
    public FloatBuffer speedBuffer;
    public List randomColor;
    public FloatBuffer randomColorBuffer;
    public FloatBuffer randomOffset;
    public List baseRotation;
    public FloatBuffer baseRotationBuffer;

    public ParticleBallGpuData(Scene3D val) {
        super(val);
    }

//    @property (nonatomic, assign)  GLfloat*    basePos;
//    @property (nonatomic, assign) GLuint   basePosBuffer;
//    @property (nonatomic, assign) GLuint   speedBuffer;
//    @property (nonatomic, strong)  NSMutableArray*   randomColor;
//    @property (nonatomic, assign) GLuint  randomColorBuffer;
//    @property (nonatomic, assign)  float   randomOffset;
//    @property (nonatomic, strong)  NSMutableArray*   baseRotation;
//    @property (nonatomic, assign) GLuint   baseRotationBuffer;
}
