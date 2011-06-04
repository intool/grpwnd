var sys = require('sys');
var xml = require("./node-xml/lib/node-xml");

var parser = new xml.SaxParser(function(cb) {
  cb.onStartDocument(function() {

  });
  cb.onEndDocument(function() {

  });
  cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
      sys.puts("=> Started: " + elem + " uri="+uri +" (Attributes: " + JSON.stringify(attrs) + " )");
  });
  cb.onEndElementNS(function(elem, prefix, uri) {
      sys.puts("<= End: " + elem + " uri="+uri + "\n");
         parser.pause();// pause the parser
         setTimeout(function (){parser.resume();}, 200); //resume the parser
  });
  cb.onCharacters(function(chars) {
      //sys.puts('<CHARS>'+chars+"</CHARS>");
  });
  cb.onCdata(function(cdata) {
      sys.puts('<CDATA>'+cdata+"</CDATA>");
  });
  cb.onComment(function(msg) {
      sys.puts('<COMMENT>'+msg+"</COMMENT>");
  });
  cb.onWarning(function(msg) {
      sys.puts('<WARNING>'+msg+"</WARNING>");
  });
  cb.onError(function(msg) {
      sys.puts('<ERROR>'+JSON.stringify(msg)+"</ERROR>");
  });
});


//example read from chunks
parser.parseString("<html><body>");
parser.parseString("<!-- This is the start");
parser.parseString(" and the end of a comment -->");
parser.parseString("and lots");
parser.parseString("and lots of text&am");
parser.parseString("p;some more.");
parser.parseString("<![CD");
parser.parseString("ATA[ this is");
parser.parseString(" cdata ]]>");
parser.parseString("</body");
parser.parseString("></html>");

//example read from file
parser.parseFile("sample.xml");
