package z3d.units;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;
import android.graphics.drawable.BitmapDrawable;

import java.util.List;

public class ColorTransition {
    public static Bitmap getImageData(List<Float> imgNumVec, float life) {


        Bitmap bitmap = Bitmap.createBitmap(128, 2,
                Bitmap.Config.ARGB_8888);
        bitmap.eraseColor(Color.parseColor("#FF0000"));



        return bitmap;

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
