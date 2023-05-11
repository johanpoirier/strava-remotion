const StaticMaps = require('staticmaps')
const polyline = require('@mapbox/polyline');


const options = {
    width: 1280,
    height: 720
};

const map = new StaticMaps(options);

const coords = polyline
    .decode('qxpuGwjx[a@L}@Nq@Fe@?s@FGFCJNz@Tj@f@pB?JEZJnACnAOfCChBDrBRrDEvEEd@Ib@[jAQ`@MBGAc@SQCq@]e@MaCe@iBS{@SUCk@AwAFi@KaAIs@Me@[_@m@YMOASH{@t@WZE@IYQ_@Wc@a@cASs@a@oBg@iBc@sAAOXa@h@g@`@YBKCMIKaCw@e@ISKIQ?kAFeBDm@?{@F}@AOACQGc@C_@OUG[E[@i@K}A{@_@YKMa@YKKAE@M^qAB]MuB@c@M}@FIt@e@dAYbCu@NKTGVQ`@IjBs@`@KJMCOsBoBQMm@i@WYsAaAu@]{A_AwCuBSSe@o@gAkB[_@IEIAUQSIMMI[?kAB{@Da@AOCSWi@SYO_@Ga@?sAAWQWi@i@c@S]YYOWQ]O[UWMQMO_@QS?s@Kg@GESAECCCIUGiAA]B[CGCB]x@c@n@e@Xe@FQAMFGC?MXORSJk@Gk@?k@M_@EW[s@E?CBGf@OZ}@r@M@g@CqAMmBEIM?u@CKIEo@D_@Cs@@c@Cg@JKMAe@FcA?e@A}A@o@B_@Hc@Ps@x@iCH{@NwLHuCHwAHYZIdDMHEDQC{BDs@Gs@EQa@w@Ws@e@oA]_@GKCa@@YBQJSpAeBfAkALY?_@M]UWSMc@MCE?KNE`@Ah@Ff@TXf@B?DGCUe@_A[g@UQCEAEBGJCh@Th@f@Xf@F?@C@OCMu@wBIe@@YHg@Fe@JOH?NHPb@r@fAd@XHHF@FINi@FGHAf@DHCJK`@_Bn@eBn@aAb@c@lAq@d@Md@Sj@e@f@s@LIH?HBb@h@z@zAHRt@jA\\\\r@`@n@N`@bClEVZJVd@f@Zx@NVlAjC\\\\`Ar@pAHRHh@BX?RNhA?l@FXBTj@bAX\\\\p@n@b@NP@d@H^JLH`Az@jAp@TPNR\\\\n@|A`EfAdFXz@f@tB\\\\tBCNIFo@Ae@Eq@[o@Mi@]{@s@gBaB_AeAe@]k@WQ@eAP]?_BQ}B[qBMoA]{B{@u@WSMGAEB?BPn@f@fAPThC|BbAx@bAd@p@`@FJDLCRWp@WHW@GD}AT]H]LWPQXYn@AL?LFD`@QN?JBn@VjAt@~@h@dBr@x@VpBVh@Pn@f@h@f@t@z@d@^LLr@f@nAr@|@XjARfCXrAXh@^d@LVRZb@b@jAD^DdABPDHD?t@o@vA_Bz@c@JBZt@T~@zAxDTp@T~AJzAb@dDF~AHh@?v@BXPb@B\\\\FHRJRRVl@Nn@PlAPlBLh@Tn@')
    .map(([lat, lon]) => ([lon, lat]));

const polygon = {
    coords,
    color: '#0000FFBB',
    width: 3
};

map.addPolygon(polygon);

const markerStart = {
    img: `${__dirname}/assets/marker.png`,
    offsetX: 24,
    offsetY: 48,
    width: 48,
    height: 48,
    coord: coords[0],
};
map.addMarker(markerStart);

const markerEnd = {
    img: `${__dirname}/assets/marker.png`,
    offsetX: 24,
    offsetY: 48,
    width: 48,
    height: 48,
    coord: coords[coords.length - 1],
};
map.addMarker(markerEnd);

map.render().then(() => map.image.save(`${__dirname}/output/run-map.png`, { compressionLevel: 9 }));