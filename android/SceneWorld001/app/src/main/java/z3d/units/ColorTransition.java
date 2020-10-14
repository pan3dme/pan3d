package z3d.units;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;

import java.util.List;

public class ColorTransition {
    public static Bitmap getImageData(List<Float> imgNumVec, float life) {

        Bitmap inputBitmap = Bitmap.createBitmap( 128, 2,  Bitmap.Config.ARGB_8888);
        int tintColor=  Color.RED;
        Bitmap outputBitmap = Bitmap.createBitmap(inputBitmap.getWidth(), inputBitmap.getHeight(), inputBitmap.getConfig());
        Canvas canvas = new Canvas(outputBitmap);
        Paint paint = new Paint();
        paint.setColorFilter(new PorterDuffColorFilter(tintColor, PorterDuff.Mode.SRC_IN));
        canvas.drawBitmap(inputBitmap, 0, 0, paint);
        return  inputBitmap;

        /*
         var length: number = $data.pos.length;
            var color: Vector3D = new Vector3D();
            for (var i: number = 0; i < length; i++) {
                hexToArgb($data.color[i], false, color);
                this._gnt.addColorStop($data.pos[i] / 255, 'rgba(' + color.x + ',' + color.y + ',' + color.z + ',' + $data.alpha[i] + ')');
            }
            this._cxt.fillStyle = this._gnt;
            this._cxt.fillRect(0, 0, 128, 2);
            return this._cxt.getImageData(0, 0, 128, 2);
         */
    }
}
