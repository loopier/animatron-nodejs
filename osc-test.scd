n = NetAddr("localhost", 1234);
n.sendMsg("/alo", 1, 2.3, "tres");
n.sendMsg("/listnodes");
n.sendMsg("/listsequences");
n.sendMsg("/loadsequences", "mama", "mamo", "hom-up-stairs-bg");
n.sendMsg("/loadsequence", "mama", "hom-up-stairs-bg");
n.sendMsg("/loadsequence", "mama");
n.sendMsg("/loadsequence", "mamo");
n.sendMsg("/add", "one", "mama");
n.sendMsg("/add", "hom", "hom-up-stairs-bg");
n.sendMsg("/add", "alo", "default");
n.sendMsg("/new", "one", "mama");
n.sendMsg("/remove", "alo");

n.sendMsg("/rotate", "one", -0.25);
n.sendMsg("/add", "one", "mama"); n.sendMsg("/moveto", "one", 0, 1);
n.sendMsg("/add", "one", "mama"); n.sendMsg("/color", "one", 0, 0.1, 0.1);
n.sendMsg("/color", "alo", 0xff00ff);
n.sendMsg("/color", "one", 0xff00ff);
n.sendMsg("/color", "one", 1.0, 0, 40.5);
n.sendMsg("/moveto", "one", 0, 0.5);

n.sendMsg("/add", "one", "mama"); n.sendMsg("/play", "one");
n.sendMsg("/add", "one", "mama"); n.sendMsg("/goto", "one", 3);
n.sendMsg("/goto", 4);

n.sendMsg("/add", "one", "mama");
n.sendMsg("/add", "alo", "mama");
n.sendMsg("/add", "alo", "hom-upstairs-stairs-cycle");

n.sendMsg("/select", "one");
n.sendMsg("/select", "hom");
n.sendMsg("/deselect", "alo");
n.sendMsg("/rotate", 1.2.rand);
n.sendMsg("/scale", 20.0);

n.sendMsg("/play", "hom");
n.sendMsg("/play");

n.sendMsg("/loadsequence", "mama", "hom-up-stairs-bg");
n.sendMsg("/add", "hom", "hom-up-stairs-bg");
n.sendMsg("/add", "hom", "mama");
n.sendMsg("/add", "anode", "mama");
n.sendMsg("/add", "ma", "mama");
n.sendMsg("/add", "one", "one");
n.sendMsg("/resize", "anode", "hom-up-stairs-bg");
n.sendMsg("/play", "hom");

(
n.sendMsg("/add", "hom", "hom-up-stairs-bg");
n.sendMsg("/select", "hom");
// n.sendMsg("/rotate", 0.25);
n.sendMsg("/play");
// n.sendMsg("/loop", "inf");
n.sendMsg("/dur", 1);
n.sendMsg("/repeat", -1);
)
n.sendMsg("/play"); // toggle
n.sendMsg("/stop");

n.sendMsg("/add", "down", "hom-up-stairs-bg");
n.sendMsg("/select", "hom");
n.sendMsg("/deselect", "hom");
n.sendMsg("/rotate", 1.25);
n.sendMsg("/selected");
n.sendMsg("/remove", "hom");

n.sendMsg("/loadsequence", "hom-down-stairs-hd", "hom-up-stairs-hd", "stairs");
n.sendMsg("/listsequences");
n.sendMsg("/add", "hom", "hom-up-stairs-hd");
// n.sendMsg("/add", "hom", "hom-down-stairs-hd");
n.sendMsg("/add", "stairs", "stairs");
n.sendMsg("/select", "hom");
// n.sendMsg("/remove", "hom");
n.sendMsg("/play");
// n.sendMsg("/repeat", -1);
n.sendMsg("/dur", 4);
// n.sendMsg("/rotate", 0.25);
n.sendMsg("/flipv");
n.sendMsg("/fliph");
n.sendMsg("/resetrotation");

(
~pujaramunt = { |str|
	n.sendMsg("/add", "hom", "hom-up-stairs-hd");
	n.sendMsg("/play");
	n.sendMsg("/dur", 4);
	n.sendMsg("/resetrotation");
};
~pujaravall = { |str|
	~pujaramunt.();
	n.sendMsg("/flipv")
};
~baixaravall = { |str|
	n.sendMsg("/add", "hom", "hom-down-stairs-hd");
	n.sendMsg("/play");
	n.sendMsg("/dur", 4);
	n.sendMsg("/fliph");
};
~baixaramunt = { |str|
	~baixaravall.();
	n.sendMsg("/play");
	n.sendMsg("/flipv");
};
~pujaramunt.();
)
~pujaravall.();
~baixaravall.();
~baixaramunt.();