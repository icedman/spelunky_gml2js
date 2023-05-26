/*
Returns whether there is a collision with two rectangles.
Note that the rectangles cannot have a negative width or height.
0: x1 (of the first rectangle)
1: y1
2: x2
3: y2
4: x1 (of the second rectangle)
5: y1
6: x2
7: y2
return  whether there was a collision
*/
w1 = arguments[2] - arguments[0];
h1 = arguments[3] - arguments[1];
w2 = argument6 - arguments[4];
h2 = argument7 - argument5;
if (w2 <= 0 || h2 <= 0 || w1 <= 0 || h1 <= 0) return 0;
w2 += arguments[4];
h2 += argument5;
w1 += arguments[0];
h1 += arguments[1];
return (
  (w2 < arguments[4] || w2 > arguments[0]) &&
  (h2 < argument5 || h2 > arguments[1]) &&
  (w1 < arguments[0] || w1 > arguments[4]) &&
  (h1 < arguments[1] || h1 > argument5)
);
