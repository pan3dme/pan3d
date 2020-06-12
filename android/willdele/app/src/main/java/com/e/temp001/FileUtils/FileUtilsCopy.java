package com.e.temp001.FileUtils;

import android.os.Environment;

import com.e.temp001.MainActivity;

import java.io.File;

public class FileUtilsCopy {


    public FileUtilsCopy() {

        File file = new File(MainActivity.savePath);
        /**
         *如果文件夹不存在就创建
         */
        if (!file.exists()) {
            file.mkdirs();
        }
    }

    /**
     * 创建一个文件
     * @param FileName 文件名
     * @return
     */
    public File createFile(String FileName) {

        return new File(MainActivity.savePath, FileName);
    }
}