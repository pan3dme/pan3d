package com.z3d.md5;

import com.z3d.md5.vo.Md5MeshData;
import com.z3d.md5.vo.ObjectBone;
import com.z3d.md5.vo.ObjectTri;
import com.z3d.md5.vo.ObjectUv;
import com.z3d.md5.vo.ObjectWeight;

import java.util.ArrayList;
import java.util.List;

public class MeshImportSort {
    public void processMesh(Md5MeshData meshData) {

        List<ObjectWeight> weightAry = new ArrayList<>();
        int i = 0;
        for (i = 0; i < meshData.weightItem.size(); i++) {
            weightAry.add(meshData.weightItem.get(i).clone());
        }
        List<Integer> mapkeyAry  = this.getMapValue(meshData.boneItem);
        for (i = 0; i < weightAry.size(); i++) {
            weightAry.get(i).boneId = mapkeyAry.get(weightAry.get(i).boneId);
        }
        meshData.weightItem = weightAry;
        this.processForAgal(meshData);
    }

    private void processForAgal(Md5MeshData meshData) {
        int beginKey = 1;

        List<ObjectUv> uvItem = meshData.uvItem;
        List<ObjectWeight> weightItem = meshData.weightItem;
        List<ObjectTri> triItem = meshData.triItem;

        List<Float> uvArray  = new ArrayList<>();
        List<List<Float>> ary  = new ArrayList<>();
        ary.add(new ArrayList<>());
        ary.add(new ArrayList<>());
        ary.add(new ArrayList<>());
        ary.add(new ArrayList<>());

        List<Float> boneWeightAry = new ArrayList<>();
        List<Integer> bonetIDAry = new ArrayList<>();
        List<Integer> indexAry  = new ArrayList<>();

        int skipNum;
        int beginIndex;
        int allNum;

        List<Integer> boneUseAry  = new ArrayList<>();

        for (int i = 0; i < uvItem.size(); i++) {
            beginIndex = uvItem.get(i).a;
            allNum = uvItem.get(i).b;
            for (skipNum = 0; skipNum < 4; skipNum++) {
                if (skipNum < allNum) {
//                    boneUseAry.push((weightItem[beginIndex + skipNum].boneId));
                    boneUseAry.add(weightItem.get(beginIndex + skipNum).boneId);
                } else {
//                    boneUseAry.push(boneUseAry[0]);
                    boneUseAry.add(boneUseAry.get(0));
                }
            }
        }
        boneUseAry = this.getboneNum(boneUseAry);

        for (int i = 0; i < uvItem.size(); i++) {
            beginIndex = uvItem.get(i).a;
            allNum = uvItem.get(i).b;
            for (skipNum = 0; skipNum < 4; skipNum++) {
                if (skipNum < allNum) {
                    ary.get(skipNum).add(weightItem.get(beginIndex + skipNum).x);
                    ary.get(skipNum).add(weightItem.get(beginIndex + skipNum).y);
                    ary.get(skipNum).add(weightItem.get(beginIndex + skipNum).z);
                    bonetIDAry.add(boneUseAry.indexOf((weightItem.get(beginIndex + skipNum).boneId)));
                    boneWeightAry.add(weightItem.get(beginIndex + skipNum).w);

                } else {

                    ary.get(skipNum).add(0f);
                    ary.get(skipNum).add(0f);
                    ary.get(skipNum).add(0f);
                    bonetIDAry.add(boneUseAry.indexOf(0));
                    boneWeightAry.add(0.0f);
                }
            }

            uvArray.add(uvItem.get(i).x);
            uvArray.add(uvItem.get(i).y);
        }
        meshData.boneNewIDAry = getShortArrByInter(boneUseAry);

        for (int i = 0; i < triItem.size(); i++) {
            indexAry.add(triItem.get(i).t0);
            indexAry.add(triItem.get(i).t1);
            indexAry.add(triItem.get(i).t2);
        }
        meshData.faceNum = indexAry.size() / 3;
        meshData.treNum = indexAry.size();
        this.uplodToGpu(meshData, uvArray, ary, boneWeightAry, bonetIDAry, getShortArrByInter(indexAry));
    }

    private void uplodToGpu(Md5MeshData meshData, List<Float> uvArray, List<List<Float>> ary, List<Float> boneWeightAry, List<Integer> bonetIDAry, List<Short> indexAry) {
        meshData.boneWeightAry = boneWeightAry;
        meshData.boneIDAry  = new ArrayList<>();
        for (int i = 0; i < bonetIDAry.size(); i++) {
            meshData.boneIDAry .add(Math.max(bonetIDAry.get(i), 0f));
        }
    }


    private List<Short> getShortArrByInter(List<Integer> arr){
        List<Short> outArr=new ArrayList<>();
        for(int i=0;i<arr.size();i++){
            outArr.add(arr.get(i).shortValue());
        }
        return  outArr;
    }

    private List<Integer> getboneNum(List<Integer> ary) {
        List<Integer> numAry= new ArrayList<>();
        for (int i = 0; i < ary.size(); i++) {
            if (numAry.indexOf(ary.get(i)) == -1) {
                numAry.add(ary.get(i));
            }
        }

        return numAry;
    }

    private List<Integer> getMapValue(List<ObjectBone> targetAry) {
        List<ObjectBone> newTargetAry = MeshToObjUtils.getStorNewTargerArr(targetAry);
        List<Integer> mapkeyAry = new ArrayList<>();//新旧ID映射关系
        for (int i = 0; i < targetAry.size(); i++) {
            int index = newTargetAry.indexOf(targetAry.get(i));
            mapkeyAry.add(index);
        }
        return mapkeyAry;
    }
}
