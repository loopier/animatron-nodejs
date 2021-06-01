n = NetAddr("localhost", 1234);
n.sendMsg("/alo", 1, 2.3, "tres");
n.sendMsg("/add", "one", "mama");
n.sendMsg("/add", "alo", "mama");
n.sendMsg("/new", "one", "mama");
n.sendMsg("/remove", "one");

n.sendMsg("/rotate", "one", -0.25);
n.sendMsg("/add", "one", "mama"); n.sendMsg("/moveto", "one", 0, 1);
n.sendMsg("/add", "one", "mama"); n.sendMsg("/color", "one", 0, 0.1, 0.1);
n.sendMsg("/color", "one", 1, 1, 1);
n.sendMsg("/moveto", "one", 0, 0.5);
n.sendMsg("/loadsequence", "mama");
