module GraphicScript {

    export class ftab_type {
        as;
        dec;
        mw;
        p = [];
        ind = [];
    };

    export class Font {

        SET_VERTEX_MODE = 0;
        LINE_COUNT_MODE = 1;

        SCSIZEX = 0.031250;
        SCSIZEY = 0.031250;

        xcur;
        ycur;
        nchars;
        ftab = new ftab_type();
        vertex = new GsLines();
        mode;
        lineCount

        constructor() {
            this.loadFontData();
        }

        makeText(x, y, str, colorR, colorG, colorB) {
            this.mode = this.LINE_COUNT_MODE;
            this.lineCount = 0;
            this.xcur = x;
            this.ycur = y;
            this.hcharstr(str);

            this.vertex = new GsLines();
            this.vertex.color(colorR, colorG, colorB, 1);

            this.mode = this.SET_VERTEX_MODE;
            this.lineCount = 0;
            this.xcur = x;
            this.ycur = y;
            this.hcharstr(str);

            return this.vertex;
        }

        stringXSize(str: string) {
            return this.istrlength(str) * this.SCSIZEX;
        }

        stringYSize(str: string) {
            return this.hgetcharheight('A'.charCodeAt(0));
        }

        istrlength(s: string) {
            var c;
            var i, len = 0;
            var index = 0;
            var sLength = s.length;

            for (index = 0; index < sLength; index++) {

                c = s.charCodeAt(index);

                if ((i = c - 32) < 0 || i >= this.nchars)
                    i = this.nchars - 1;

                len += (this.ftab.p[this.ftab.ind[i] + 1] - this.ftab.p[this.ftab.ind[i]]);
            }
            return (len);
        }

        hgetcharheight(c: number) {
            return (this.ftab.as - this.ftab.dec) * this.SCSIZEY;
        }

        hcharstr(str: string) {
            for (var index = 0; index < str.length; index++) {
                this.hdrawchar(str.charCodeAt(index));
            }
        }

        hdrawchar(c: number) {
            var p, e;
            var Move, i, x, y, xt, yt;
            var xs, ys, xp, yp, tmp, xtmp, ytmp;

            if ((i = c - 32) < 0)
                i = 0;
            if (i >= this.nchars)
                i = this.nchars - 1;

            Move = 1;

            xt = Math.floor((this.ftab.p[this.ftab.ind[i]]) - 'R'.charCodeAt(0));
            yt = this.ftab.dec;

            e = this.ftab.ind[i + 1];
            p = this.ftab.ind[i] + 2;

            xtmp = ytmp = 0.0;

            while (p < e) {
                x = Math.floor(Math.floor(this.ftab.p[p++]) - 'R'.charCodeAt(0)) ;
                y = Math.floor('R'.charCodeAt(0) - Math.floor(this.ftab.p[p++])) ;
                if (x != -50) {                     // means move
                    xp = (x - xt) * this.SCSIZEX;
                    yp = (y - yt) * this.SCSIZEY;

                    xs = xp - xtmp;
                    ys = yp - ytmp;
                    xtmp = xp;
                    ytmp = yp;

                    if (Move == 1) {
                        Move = 0;
                        this.xcur += xs;
                        this.ycur += ys;

                    } else {
                        switch (this.mode) {

                            case this.SET_VERTEX_MODE:
                                this.vertex.vertex(this.xcur, this.ycur, 0.0);
                                this.xcur += xs;
                                this.ycur += ys;
                                this.vertex.vertex(this.xcur, this.ycur, 0.0);
                                this.lineCount++;
                                break;

                            case this.LINE_COUNT_MODE:
                                this.lineCount++;
                                break;
                        }
                    }

                } else {
                    Move = 1;
                }
            }

            tmp = (this.ftab.p[this.ftab.ind[i] + 1] - this.ftab.p[this.ftab.ind[i]]);
            tmp *= this.SCSIZEX;

            xs = tmp - xtmp;
            ys = - ytmp;

            this.xcur += xs;
            this.ycur += ys;
        }

        loadFontData() {
            this.nchars = 96;
            this.ftab.as = 16;
            this.ftab.dec = -16;
            this.ftab.mw = 30;
            this.ftab.p = [74,90,77,87,82,70,82,84,32,82,82,89,81,90,82,91,83,90,82,89,74,90,78,70,78,77,32,82,86,70,86,77,72,93,83,66,76,98,32,82,89,66,82,98,32,82,76,79,90,79,32,82,75,85,89,85,72,92,80,66,80,95,32,82,84,66,84,95,32,82,89,73,87,71,84,70,80,70,77,71,75,73,75,75,76,77,77,78,79,79,85,81,87,82,88,83,89,85,89,88,87,90,84,91,80,91,77,90,75,88,70,94,91,70,73,91,32,82,78,70,80,72,80,74,79,76,77,77,75,77,73,75,73,73,74,71,76,70,78,70,80,71,83,72,86,72,89,71,91,70,32,82,87,84,85,85,84,87,84,89,86,91,88,91,90,90,91,88,91,86,89,84,87,84,69,95,92,79,92,78,91,77,90,77,89,78,88,80,86,85,84,88,82,90,80,91,76,91,74,90,73,89,72,87,72,85,73,83,74,82,81,78,82,77,83,75,83,73,82,71,80,70,78,71,77,73,77,75,78,78,80,81,85,88,87,90,89,91,91,91,92,90,92,89,77,87,82,72,81,71,82,70,83,71,83,73,82,75,81,76,75,89,86,66,84,68,82,71,80,75,79,80,79,84,80,89,82,93,84,96,86,98,75,89,78,66,80,68,82,71,84,75,85,80,85,84,84,89,82,93,80,96,78,98,74,90,82,76,82,88,32,82,77,79,87,85,32,82,87,79,77,85,69,95,82,73,82,91,32,82,73,82,91,82,78,86,83,87,82,88,81,87,82,86,83,87,83,89,81,91,69,95,73,82,91,82,78,86,82,86,81,87,82,88,83,87,82,86,71,93,91,66,73,98,72,92,81,70,78,71,76,74,75,79,75,82,76,87,78,90,81,91,83,91,86,90,88,87,89,82,89,79,88,74,86,71,83,70,81,70,72,92,78,74,80,73,83,70,83,91,72,92,76,75,76,74,77,72,78,71,80,70,84,70,86,71,87,72,88,74,88,76,87,78,85,81,75,91,89,91,72,92,77,70,88,70,82,78,85,78,87,79,88,80,89,83,89,85,88,88,86,90,83,91,80,91,77,90,76,89,75,87,72,92,85,70,75,84,90,84,32,82,85,70,85,91,72,92,87,70,77,70,76,79,77,78,80,77,83,77,86,78,88,80,89,83,89,85,88,88,86,90,83,91,80,91,77,90,76,89,75,87,72,92,88,73,87,71,84,70,82,70,79,71,77,74,76,79,76,84,77,88,79,90,82,91,83,91,86,90,88,88,89,85,89,84,88,81,86,79,83,78,82,78,79,79,77,81,76,84,72,92,89,70,79,91,32,82,75,70,89,70,72,92,80,70,77,71,76,73,76,75,77,77,79,78,83,79,86,80,88,82,89,84,89,87,88,89,87,90,84,91,80,91,77,90,76,89,75,87,75,84,76,82,78,80,81,79,85,78,87,77,88,75,88,73,87,71,84,70,80,70,72,92,88,77,87,80,85,82,82,83,81,83,78,82,76,80,75,77,75,76,76,73,78,71,81,70,82,70,85,71,87,73,88,77,88,82,87,87,85,90,82,91,80,91,77,90,76,88,78,86,82,79,81,80,82,81,83,80,82,79,32,82,82,86,81,87,82,88,83,87,82,86,78,86,82,79,81,80,82,81,83,80,82,79,32,82,83,87,82,88,81,87,82,86,83,87,83,89,81,91,70,94,90,73,74,82,90,91,69,95,73,79,91,79,32,82,73,85,91,85,70,94,74,73,90,82,74,91,73,91,76,75,76,74,77,72,78,71,80,70,84,70,86,71,87,72,88,74,88,76,87,78,86,79,82,81,82,84,32,82,82,89,81,90,82,91,83,90,82,89,69,96,87,78,86,76,84,75,81,75,79,76,78,77,77,80,77,83,78,85,80,86,83,86,85,85,86,83,32,82,81,75,79,77,78,80,78,83,79,85,80,86,32,82,87,75,86,83,86,85,88,86,90,86,92,84,93,81,93,79,92,76,91,74,89,72,87,71,84,70,81,70,78,71,76,72,74,74,73,76,72,79,72,82,73,85,74,87,76,89,78,90,81,91,84,91,87,90,89,89,90,88,32,82,88,75,87,83,87,85,88,86,73,91,82,70,74,91,32,82,82,70,90,91,32,82,77,84,87,84,71,92,75,70,75,91,32,82,75,70,84,70,87,71,88,72,89,74,89,76,88,78,87,79,84,80,32,82,75,80,84,80,87,81,88,82,89,84,89,87,88,89,87,90,84,91,75,91,72,93,90,75,89,73,87,71,85,70,81,70,79,71,77,73,76,75,75,78,75,83,76,86,77,88,79,90,81,91,85,91,87,90,89,88,90,86,71,92,75,70,75,91,32,82,75,70,82,70,85,71,87,73,88,75,89,78,89,83,88,86,87,88,85,90,82,91,75,91,72,91,76,70,76,91,32,82,76,70,89,70,32,82,76,80,84,80,32,82,76,91,89,91,72,90,76,70,76,91,32,82,76,70,89,70,32,82,76,80,84,80,72,93,90,75,89,73,87,71,85,70,81,70,79,71,77,73,76,75,75,78,75,83,76,86,77,88,79,90,81,91,85,91,87,90,89,88,90,86,90,83,32,82,85,83,90,83,71,93,75,70,75,91,32,82,89,70,89,91,32,82,75,80,89,80,78,86,82,70,82,91,74,90,86,70,86,86,85,89,84,90,82,91,80,91,78,90,77,89,76,86,76,84,71,92,75,70,75,91,32,82,89,70,75,84,32,82,80,79,89,91,72,89,76,70,76,91,32,82,76,91,88,91,70,94,74,70,74,91,32,82,74,70,82,91,32,82,90,70,82,91,32,82,90,70,90,91,71,93,75,70,75,91,32,82,75,70,89,91,32,82,89,70,89,91,71,93,80,70,78,71,76,73,75,75,74,78,74,83,75,86,76,88,78,90,80,91,84,91,86,90,88,88,89,86,90,83,90,78,89,75,88,73,86,71,84,70,80,70,71,92,75,70,75,91,32,82,75,70,84,70,87,71,88,72,89,74,89,77,88,79,87,80,84,81,75,81,71,93,80,70,78,71,76,73,75,75,74,78,74,83,75,86,76,88,78,90,80,91,84,91,86,90,88,88,89,86,90,83,90,78,89,75,88,73,86,71,84,70,80,70,32,82,83,87,89,93,71,92,75,70,75,91,32,82,75,70,84,70,87,71,88,72,89,74,89,76,88,78,87,79,84,80,75,80,32,82,82,80,89,91,72,92,89,73,87,71,84,70,80,70,77,71,75,73,75,75,76,77,77,78,79,79,85,81,87,82,88,83,89,85,89,88,87,90,84,91,80,91,77,90,75,88,74,90,82,70,82,91,32,82,75,70,89,70,71,93,75,70,75,85,76,88,78,90,81,91,83,91,86,90,88,88,89,85,89,70,73,91,74,70,82,91,32,82,90,70,82,91,70,94,72,70,77,91,32,82,82,70,77,91,32,82,82,70,87,91,32,82,92,70,87,91,72,92,75,70,89,91,32,82,89,70,75,91,73,91,74,70,82,80,82,91,32,82,90,70,82,80,72,92,89,70,75,91,32,82,75,70,89,70,32,82,75,91,89,91,75,89,79,66,79,98,32,82,80,66,80,98,32,82,79,66,86,66,32,82,79,98,86,98,75,89,75,70,89,94,75,89,84,66,84,98,32,82,85,66,85,98,32,82,78,66,85,66,32,82,78,98,85,98,74,90,82,68,74,82,32,82,82,68,90,82,73,91,73,98,91,98,78,86,83,75,81,77,81,79,82,80,83,79,82,78,81,79,73,92,88,77,88,91,32,82,88,80,86,78,84,77,81,77,79,78,77,80,76,83,76,85,77,88,79,90,81,91,84,91,86,90,88,88,72,91,76,70,76,91,32,82,76,80,78,78,80,77,83,77,85,78,87,80,88,83,88,85,87,88,85,90,83,91,80,91,78,90,76,88,73,91,88,80,86,78,84,77,81,77,79,78,77,80,76,83,76,85,77,88,79,90,81,91,84,91,86,90,88,88,73,92,88,70,88,91,32,82,88,80,86,78,84,77,81,77,79,78,77,80,76,83,76,85,77,88,79,90,81,91,84,91,86,90,88,88,73,91,76,83,88,83,88,81,87,79,86,78,84,77,81,77,79,78,77,80,76,83,76,85,77,88,79,90,81,91,84,91,86,90,88,88,77,89,87,70,85,70,83,71,82,74,82,91,32,82,79,77,86,77,73,92,88,77,88,93,87,96,86,97,84,98,81,98,79,97,32,82,88,80,86,78,84,77,81,77,79,78,77,80,76,83,76,85,77,88,79,90,81,91,84,91,86,90,88,88,73,92,77,70,77,91,32,82,77,81,80,78,82,77,85,77,87,78,88,81,88,91,78,86,81,70,82,71,83,70,82,69,81,70,32,82,82,77,82,91,77,87,82,70,83,71,84,70,83,69,82,70,32,82,83,77,83,94,82,97,80,98,78,98,73,90,77,70,77,91,32,82,87,77,77,87,32,82,81,83,88,91,78,86,82,70,82,91,67,97,71,77,71,91,32,82,71,81,74,78,76,77,79,77,81,78,82,81,82,91,32,82,82,81,85,78,87,77,90,77,92,78,93,81,93,91,73,92,77,77,77,91,32,82,77,81,80,78,82,77,85,77,87,78,88,81,88,91,73,92,81,77,79,78,77,80,76,83,76,85,77,88,79,90,81,91,84,91,86,90,88,88,89,85,89,83,88,80,86,78,84,77,81,77,72,91,76,77,76,98,32,82,76,80,78,78,80,77,83,77,85,78,87,80,88,83,88,85,87,88,85,90,83,91,80,91,78,90,76,88,73,92,88,77,88,98,32,82,88,80,86,78,84,77,81,77,79,78,77,80,76,83,76,85,77,88,79,90,81,91,84,91,86,90,88,88,75,88,79,77,79,91,32,82,79,83,80,80,82,78,84,77,87,77,74,91,88,80,87,78,84,77,81,77,78,78,77,80,78,82,80,83,85,84,87,85,88,87,88,88,87,90,84,91,81,91,78,90,77,88,77,89,82,70,82,87,83,90,85,91,87,91,32,82,79,77,86,77,73,92,77,77,77,87,78,90,80,91,83,91,85,90,88,87,32,82,88,77,88,91,74,90,76,77,82,91,32,82,88,77,82,91,71,93,74,77,78,91,32,82,82,77,78,91,32,82,82,77,86,91,32,82,90,77,86,91,74,91,77,77,88,91,32,82,88,77,77,91,74,90,76,77,82,91,32,82,88,77,82,91,80,95,78,97,76,98,75,98,74,91,88,77,77,91,32,82,77,77,88,77,32,82,77,91,88,91,75,89,84,66,82,67,81,68,80,70,80,72,81,74,82,75,83,77,83,79,81,81,32,82,82,67,81,69,81,71,82,73,83,74,84,76,84,78,83,80,79,82,83,84,84,86,84,88,83,90,82,91,81,93,81,95,82,97,32,82,81,83,83,85,83,87,82,89,81,90,80,92,80,94,81,96,82,97,84,98,78,86,82,66,82,98,75,89,80,66,82,67,83,68,84,70,84,72,83,74,82,75,81,77,81,79,83,81,32,82,82,67,83,69,83,71,82,73,81,74,80,76,80,78,81,80,85,82,81,84,80,86,80,88,81,90,82,91,83,93,83,95,82,97,32,82,83,83,81,85,81,87,82,89,83,90,84,92,84,94,83,96,82,97,80,98,70,94,73,85,73,83,74,80,76,79,78,79,80,80,84,83,86,84,88,84,90,83,91,81,32,82,73,83,74,81,76,80,78,80,80,81,84,84,86,85,88,85,90,84,91,81,91,79,74,90,74,70,74,91,75,91,75,70,76,70,76,91,77,91,77,70,78,70,78,91,79,91,79,70,80,70,80,91,81,91,81,70,82,70,82,91,83,91,83,70,84,70,84,91,85,91,85,70,86,70,86,91,87,91,87,70,88,70,88,91,89,91,89,70,90,70,90,91];
            this.ftab.ind = [0,2,20,32,56,110,174,244,260,282,304,322,334,350,356,368,374,410,420,450,482,496,532,580,592,652,700,724,752,760,772,780,822,934,952,1000,1038,1070,1094,1112,1158,1176,1182,1204,1222,1234,1258,1276,1320,1348,1398,1432,1474,1486,1508,1520,1544,1556,1570,1588,1612,1618,1642,1654,1660,1676,1712,1748,1778,1814,1850,1868,1914,1936,1954,1978,1996,2002,2040,2062,2098,2134,2170,2188,2224,2242,2264,2276,2300,2312,2332,2350,2430,2436,2516,2564,2634];
        }
    }
}
