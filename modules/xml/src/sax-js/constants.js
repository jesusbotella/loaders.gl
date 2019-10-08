
// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
// since that's the earliest that a buffer overrun could occur.  This way, checks are
// as rare as required, but as often as necessary to ensure never crossing this bound.
// Furthermore, buffers are only tested at most once per write(), so passing a very
// large string into write() might have undesirable effects, but this is manageable by
// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
// edge case, result in creating at most one complete copy of the string passed in.
// Set to Infinity to have unlimited buffers.
export const MAX_BUFFER_LENGTH = 64 * 1024

export const EVENTS = [
  'text',
  'processinginstruction',
  'sgmldeclaration',
  'doctype',
  'comment',
  'opentagstart',
  'attribute',
  'opentag',
  'closetag',
  'opencdata',
  'cdata',
  'closecdata',
  'error',
  'end',
  'ready',
  'script',
  'opennamespace',
  'closenamespace'
]

var S = 0

export const STATE = {
  BEGIN: S++, // leading byte order mark or whitespace
  BEGIN_WHITESPACE: S++, // leading whitespace
  TEXT: S++, // general stuff
  TEXT_ENTITY: S++, // &amp and such.
  OPEN_WAKA: S++, // <
  SGML_DECL: S++, // <!BLARG
  SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
  DOCTYPE: S++, // <!DOCTYPE
  DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
  DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
  DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
  COMMENT_STARTING: S++, // <!-
  COMMENT: S++, // <!--
  COMMENT_ENDING: S++, // <!-- blah -
  COMMENT_ENDED: S++, // <!-- blah --
  CDATA: S++, // <![CDATA[ something
  CDATA_ENDING: S++, // ]
  CDATA_ENDING_2: S++, // ]]
  PROC_INST: S++, // <?hi
  PROC_INST_BODY: S++, // <?hi there
  PROC_INST_ENDING: S++, // <?hi "there" ?
  OPEN_TAG: S++, // <strong
  OPEN_TAG_SLASH: S++, // <strong /
  ATTRIB: S++, // <a
  ATTRIB_NAME: S++, // <a foo
  ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
  ATTRIB_VALUE: S++, // <a foo=
  ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
  ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
  ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
  ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
  ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
  CLOSE_TAG: S++, // </a
  CLOSE_TAG_SAW_WHITE: S++, // </a   >
  SCRIPT: S++, // <script> ...
  SCRIPT_ENDING: S++ // <script> ... <
}

export const XML_ENTITIES = {
  'amp': '&',
  'gt': '>',
  'lt': '<',
  'quot': '"',
  'apos': "'"
}

export const ENTITIES = {
  'amp': '&',
  'gt': '>',
  'lt': '<',
  'quot': '"',
  'apos': "'",
  'AElig': 198,
  'Aacute': 193,
  'Acirc': 194,
  'Agrave': 192,
  'Aring': 197,
  'Atilde': 195,
  'Auml': 196,
  'Ccedil': 199,
  'ETH': 208,
  'Eacute': 201,
  'Ecirc': 202,
  'Egrave': 200,
  'Euml': 203,
  'Iacute': 205,
  'Icirc': 206,
  'Igrave': 204,
  'Iuml': 207,
  'Ntilde': 209,
  'Oacute': 211,
  'Ocirc': 212,
  'Ograve': 210,
  'Oslash': 216,
  'Otilde': 213,
  'Ouml': 214,
  'THORN': 222,
  'Uacute': 218,
  'Ucirc': 219,
  'Ugrave': 217,
  'Uuml': 220,
  'Yacute': 221,
  'aacute': 225,
  'acirc': 226,
  'aelig': 230,
  'agrave': 224,
  'aring': 229,
  'atilde': 227,
  'auml': 228,
  'ccedil': 231,
  'eacute': 233,
  'ecirc': 234,
  'egrave': 232,
  'eth': 240,
  'euml': 235,
  'iacute': 237,
  'icirc': 238,
  'igrave': 236,
  'iuml': 239,
  'ntilde': 241,
  'oacute': 243,
  'ocirc': 244,
  'ograve': 242,
  'oslash': 248,
  'otilde': 245,
  'ouml': 246,
  'szlig': 223,
  'thorn': 254,
  'uacute': 250,
  'ucirc': 251,
  'ugrave': 249,
  'uuml': 252,
  'yacute': 253,
  'yuml': 255,
  'copy': 169,
  'reg': 174,
  'nbsp': 160,
  'iexcl': 161,
  'cent': 162,
  'pound': 163,
  'curren': 164,
  'yen': 165,
  'brvbar': 166,
  'sect': 167,
  'uml': 168,
  'ordf': 170,
  'laquo': 171,
  'not': 172,
  'shy': 173,
  'macr': 175,
  'deg': 176,
  'plusmn': 177,
  'sup1': 185,
  'sup2': 178,
  'sup3': 179,
  'acute': 180,
  'micro': 181,
  'para': 182,
  'middot': 183,
  'cedil': 184,
  'ordm': 186,
  'raquo': 187,
  'frac14': 188,
  'frac12': 189,
  'frac34': 190,
  'iquest': 191,
  'times': 215,
  'divide': 247,
  'OElig': 338,
  'oelig': 339,
  'Scaron': 352,
  'scaron': 353,
  'Yuml': 376,
  'fnof': 402,
  'circ': 710,
  'tilde': 732,
  'Alpha': 913,
  'Beta': 914,
  'Gamma': 915,
  'Delta': 916,
  'Epsilon': 917,
  'Zeta': 918,
  'Eta': 919,
  'Theta': 920,
  'Iota': 921,
  'Kappa': 922,
  'Lambda': 923,
  'Mu': 924,
  'Nu': 925,
  'Xi': 926,
  'Omicron': 927,
  'Pi': 928,
  'Rho': 929,
  'Sigma': 931,
  'Tau': 932,
  'Upsilon': 933,
  'Phi': 934,
  'Chi': 935,
  'Psi': 936,
  'Omega': 937,
  'alpha': 945,
  'beta': 946,
  'gamma': 947,
  'delta': 948,
  'epsilon': 949,
  'zeta': 950,
  'eta': 951,
  'theta': 952,
  'iota': 953,
  'kappa': 954,
  'lambda': 955,
  'mu': 956,
  'nu': 957,
  'xi': 958,
  'omicron': 959,
  'pi': 960,
  'rho': 961,
  'sigmaf': 962,
  'sigma': 963,
  'tau': 964,
  'upsilon': 965,
  'phi': 966,
  'chi': 967,
  'psi': 968,
  'omega': 969,
  'thetasym': 977,
  'upsih': 978,
  'piv': 982,
  'ensp': 8194,
  'emsp': 8195,
  'thinsp': 8201,
  'zwnj': 8204,
  'zwj': 8205,
  'lrm': 8206,
  'rlm': 8207,
  'ndash': 8211,
  'mdash': 8212,
  'lsquo': 8216,
  'rsquo': 8217,
  'sbquo': 8218,
  'ldquo': 8220,
  'rdquo': 8221,
  'bdquo': 8222,
  'dagger': 8224,
  'Dagger': 8225,
  'bull': 8226,
  'hellip': 8230,
  'permil': 8240,
  'prime': 8242,
  'Prime': 8243,
  'lsaquo': 8249,
  'rsaquo': 8250,
  'oline': 8254,
  'frasl': 8260,
  'euro': 8364,
  'image': 8465,
  'weierp': 8472,
  'real': 8476,
  'trade': 8482,
  'alefsym': 8501,
  'larr': 8592,
  'uarr': 8593,
  'rarr': 8594,
  'darr': 8595,
  'harr': 8596,
  'crarr': 8629,
  'lArr': 8656,
  'uArr': 8657,
  'rArr': 8658,
  'dArr': 8659,
  'hArr': 8660,
  'forall': 8704,
  'part': 8706,
  'exist': 8707,
  'empty': 8709,
  'nabla': 8711,
  'isin': 8712,
  'notin': 8713,
  'ni': 8715,
  'prod': 8719,
  'sum': 8721,
  'minus': 8722,
  'lowast': 8727,
  'radic': 8730,
  'prop': 8733,
  'infin': 8734,
  'ang': 8736,
  'and': 8743,
  'or': 8744,
  'cap': 8745,
  'cup': 8746,
  'int': 8747,
  'there4': 8756,
  'sim': 8764,
  'cong': 8773,
  'asymp': 8776,
  'ne': 8800,
  'equiv': 8801,
  'le': 8804,
  'ge': 8805,
  'sub': 8834,
  'sup': 8835,
  'nsub': 8836,
  'sube': 8838,
  'supe': 8839,
  'oplus': 8853,
  'otimes': 8855,
  'perp': 8869,
  'sdot': 8901,
  'lceil': 8968,
  'rceil': 8969,
  'lfloor': 8970,
  'rfloor': 8971,
  'lang': 9001,
  'rang': 9002,
  'loz': 9674,
  'spades': 9824,
  'clubs': 9827,
  'hearts': 9829,
  'diams': 9830
}

Object.keys(ENTITIES).forEach(function (key) {
  var e = ENTITIES[key]
  var s = typeof e === 'number' ? String.fromCharCode(e) : e
  ENTITIES[key] = s
})

for (var s in STATE) {
  STATE[STATE[s]] = s
}
