package z3d.units;
import android.os.AsyncTask;
import android.util.Log;

import com.one.R;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;
import z3d.base.SkillBackFun;
import z3d.res.SkillRes;

/**
 * 括号里的类型
 * 第一个代表doInBackground方法需要传入的类型
 * 第二个代表onProgressUpdate方法需要传入的类型
 * 第一个代表onPostExecute方法需要传入的类型
 */
public class HttpUrlConnectionAsyncTask extends AsyncTask<Integer, Integer, String> {

    private String urlPath;
    public String filePath;
    private CallBackFun backFun;

    public void downloadFile(CallBackFun bfun, String urlPath, String filePath) {
        this.urlPath = urlPath;
        this.filePath = filePath;
        this.backFun=bfun;
        //调用doInBackground方法（方法里面是异步执行）
        execute(2);
    }

    @Override
    protected String doInBackground(Integer... integers) {
        return download();
    }


    private String download() {
        HttpURLConnection connection = null;
        InputStream inputStream = null;
        OutputStream outputStream = null;
        String result = "";
        try {
            //获得URL对象
            URL url = new URL(urlPath);
            //返回一个URLConnection对象，它表示到URL所引用的远程对象的连接
            connection = (HttpURLConnection) url.openConnection();
            //建立实际链接
            connection.connect();
            inputStream=connection.getInputStream();
            //获取文件长度
            Double size = (double) connection.getContentLength();

            outputStream = new FileOutputStream(new File((filePath)),true);
            int count = 0;
            // 计算上传进度
            Long progress = 0L;
            byte[]  bytes= new byte[2048];
            while ((count=inputStream.read(bytes))!=-1){
                outputStream.write(bytes,0,count);
                //换算进度
                double d = (new BigDecimal(progress / size).setScale(2, BigDecimal.ROUND_HALF_UP)).doubleValue();
                double d1 = d * 100;
                //传入的值为1-100
                onProgressUpdate((int) d1);
            }
            result = "下载成功";
        } catch (Exception e) {
            e.printStackTrace();
            onCancelled(e.getMessage());
        } finally {
            //关闭
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null) {
                connection.disconnect();
            }
        }
        return result;
    }


    @Override
    protected void onProgressUpdate(Integer... values) {
        super.onProgressUpdate(values);

    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        backFun.StateChange(true);
    }

    @Override
    protected void onCancelled(String s) {
        super.onCancelled(s);

    }

}