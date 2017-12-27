class Sprite
{
 constructor(img, width, height)
 {
   this.img = img;
   this.width = width;
   this.height = height;
 }

 draw(ctx, x, y)
 {
  ctx.drawImage(this.img,x, y);
 }

}