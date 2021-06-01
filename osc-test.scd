n = NetAddr("localhost", 1234);
n.sendMsg("/alo", 1, 2.3, "tres");
n.sendMsg("/listnodes");
n.sendMsg("/listsequences");
n.sendMsg("/loadsequence", "mama");
n.sendMsg("/loadsequence", "mamo");
n.sendMsg("/add", "one", "mama");
n.sendMsg("/add", "alo", "default");
n.sendMsg("/new", "one", "mama");
n.sendMsg("/remove", "one");

n.sendMsg("/rotate", "one", -0.25);
n.sendMsg("/add", "one", "mama"); n.sendMsg("/moveto", "one", 0, 1);
n.sendMsg("/add", "one", "mama"); n.sendMsg("/color", "one", 0, 0.1, 0.1);
n.sendMsg("/color", "alo", 0xff00ff);
n.sendMsg("/color", "one", 0xff00ff);
n.sendMsg("/color", "one", 1.0, 0, 40.5);
n.sendMsg("/moveto", "one", 0, 0.5);

n.sendMsg("/add", "one", "mama"); n.sendMsg("/play", "one");
n.sendMsg("/add", "one", "mama"); n.sendMsg("/goto", "one", 3);
n.sendMsg("/goto", "one", 1);