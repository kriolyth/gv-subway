use crate::imga::{Mark, FeatureData};
pub const FEATURE_DATA: [(FeatureData, Mark); 38] = [
	(FeatureData { x: 11, y: 11, bits_1: [20935737, 2734798361, 4260159929, 2185833650, 1217894208, 814393910], bits_2: [19757097, 2736895513, 4285329849, 2152409530, 2023200592, 814397990] }, Mark::Direction), // 2
	(FeatureData { x: 11, y: 11, bits_1: [2703193497, 1744897557, 1772662589, 1174678683, 3986133152, 2982956790], bits_2: [2837411225, 673777431, 971550649, 3330550923, 3986133680, 2974568134] }, Mark::Direction), // 8
	(FeatureData { x: 11, y: 11, bits_1: [152384794, 2183239285, 703109564, 1187785088, 3380975796, 835246662], bits_2: [20199450, 2183235349, 2309790140, 109848704, 3385171124, 814266951] }, Mark::Entrance), // 4 need it ?
	(FeatureData { x: 11, y: 11, bits_1: [2503963309, 2652933507, 3482177853, 2600677299, 3337032784, 1479683797], bits_2: [3175051941, 2652900739, 1572725309, 2571308731, 3874821209, 1479683733] }, Mark::Entrance), // 5
	(FeatureData { x: 11, y: 11, bits_1: [2168271005, 3607170841, 431790009, 33564843, 3366426384, 287714006], bits_2: [2168270989, 3609266075, 436048825, 2290231688, 3404175121, 268839575] }, Mark::Entrance),
	(FeatureData { x: 11, y: 11, bits_1: [297761069, 2787151397, 2341001661, 1527066035, 3303939572, 817000406], bits_2: [423588797, 2921369095, 3716797373, 2671840435, 3840218196, 1487957717] }, Mark::Entrance),
	// (FeatureData { x: 11, y: 11, bits_1: [295139599, 2787217013, 2408110589, 58993968, 3234601460, 816371670], bits_2: [20413229, 3458305537, 3716733437, 50670643, 3838646484, 2023778263] }, Mark::Entrance), // 6
	(FeatureData { x: 11, y: 11, bits_1: [18166040, 3324088181, 696819645, 1183066257, 3381631664, 833380038], bits_2: [2167747480, 3592521499, 160208824, 1115957633, 3385301808, 948321991] }, Mark::Entrance), // 7
	(FeatureData { x: 11, y: 11, bits_1: [362098958, 2533986041, 2676546045, 44050736, 3767310820, 834196958], bits_2: [20263212, 3741421209, 3716708797, 37824563, 3838679252, 834201567] }, Mark::Entrance), // 8
	(FeatureData { x: 11, y: 11, bits_1: [1228747834, 2470557209, 4260159977, 2185833632, 1753585652, 545958711], bits_2: [1094531112, 2470557209, 4293718507, 2152409888, 1753585660, 562740015] }, Mark::FinalBoss), // 2
	(FeatureData { x: 11, y: 11, bits_1: [4187501595, 2787764503, 2745732915, 3464769921, 164484789, 595249733], bits_2: [4055904391, 2519330563, 2208878371, 243540273, 432953076, 574229061] }, Mark::FinalBoss), // 3
	(FeatureData { x: 11, y: 11, bits_1: [958281658, 671154999, 1772678077, 3601086611, 3986012389, 3143386853], bits_2: [2837264042, 673284903, 703129907, 3601086592, 3989125349, 3143388773] }, Mark::FinalBoss), // 6
	(FeatureData { x: 11, y: 11, bits_1: [4187928226, 2686542635, 2708008371, 3601610883, 4254414069, 2873772645], bits_2: [4186881698, 2703878923, 2875780403, 3735826689, 3180143861, 729500261] }, Mark::FinalBoss), // 7
	(FeatureData { x: 11, y: 11, bits_1: [2837393434, 2181137175, 698915261, 3330553984, 3380974261, 861440583], bits_2: [2703044619, 2451674883, 166500666, 2391026048, 3385136821, 840567367] }, Mark::FinalBoss), // 8
	(FeatureData { x: 11, y: 11, bits_1: [20779033, 2449474065, 17338684, 2147493888, 147100176, 35160581], bits_2: [18419721, 2451575297, 823596, 2147491968, 147066898, 34603521] }, Mark::FinalBoss),
	// (FeatureData { x: 11, y: 11, bits_1: [2978354834, 2686985223, 539496337, 1443102721, 2375026804, 675827812], bits_2: [3045987970, 2150114311, 539496209, 369360897, 2407530612, 675827812] }, Mark::Fountain), // 7 too close to trap
	(FeatureData { x: 11, y: 11, bits_1: [431373747, 2835459597, 4025019357, 2521630771, 1770067188, 568885990], bits_2: [2576759995, 2300683785, 3991464413, 2521639091, 1234244852, 559456998] }, Mark::Ladder), // 1
	(FeatureData { x: 11, y: 11, bits_1: [423001531, 2837554701, 3924617693, 2253138066, 3384876276, 550017766], bits_2: [2568387755, 2334238603, 3924617631, 2261526656, 3414234356, 810060390] }, Mark::Ladder), // 2
	(FeatureData { x: 11, y: 11, bits_1: [428228514, 706847341, 1776873429, 4130113552, 3986168052, 702108902], bits_2: [428752810, 2820777573, 1774774749, 4130113552, 3314358516, 702109158] }, Mark::Ladder), // 7
	(FeatureData { x: 11, y: 11, bits_1: [948189178, 539500580, 1751132048, 3863750673, 3305113620, 2831177920], bits_2: [948189170, 539603492, 1751147408, 4140566801, 3305179156, 2831700194] }, Mark::Ladder), // 8
	(FeatureData { x: 11, y: 11, bits_1: [135606714, 3640758877, 1501952422, 115615744, 1770885556, 831313170], bits_2: [137703466, 3674313565, 428653998, 48507008, 1775079860, 831296827] }, Mark::Luck), // 1
	(FeatureData { x: 11, y: 11, bits_1: [137437450, 3644953104, 429764774, 48244864, 1611436932, 293922207], bits_2: [137439498, 3686896400, 429232294, 48244868, 1615762308, 293907743] }, Mark::Luck), // 2
	(FeatureData { x: 11, y: 11, bits_1: [2836298795, 2736895627, 4016630109, 3545049264, 3297973972, 1884818023], bits_2: [2702081081, 2736895883, 3479756831, 2471307426, 3700627156, 1884981862] }, Mark::Luck), // 7
	(FeatureData { x: 11, y: 11, bits_1: [2568910251, 2837555083, 1776871869, 3603704979, 3985970404, 827968230], bits_2: [2568912315, 2736891787, 3915966783, 2529701248, 3716224244, 827968102] }, Mark::Luck), // 8
	(FeatureData { x: 11, y: 11, bits_1: [421426603, 2820777611, 1772677565, 3594792083, 3985969396, 827969270], bits_2: [2837345707, 2871109531, 703129919, 2529438848, 3448049908, 827968102] }, Mark::Luck), // 8
	(FeatureData { x: 11, y: 11, bits_1: [2300539963, 4213282585, 1837693373, 2185309312, 3230078660, 818449271], bits_2: [2166322233, 3139540891, 499954111, 2185309314, 3230078612, 810191446] }, Mark::Luck),
	(FeatureData { x: 11, y: 11, bits_1: [0, 0, 0, 0, 0, 0], bits_2: [0, 0, 0, 0, 0, 0] }, Mark::None),
	(FeatureData { x: 11, y: 11, bits_1: [152468507, 2183247221, 699173309, 2277780608, 3250919604, 814258246], bits_2: [2704702491, 3256984839, 166496703, 2273586560, 3250920884, 1879750727] }, Mark::OtherBoss), // 4
	(FeatureData { x: 11, y: 11, bits_1: [948322202, 2787750253, 1810639864, 3488360704, 3246727092, 2022480070], bits_2: [950419130, 2200548655, 3958139386, 3486328832, 3246727156, 2026418279] }, Mark::OtherBoss), // 8a
	(FeatureData { x: 11, y: 11, bits_1: [965098554, 2787751269, 3957910008, 2412521728, 3246726644, 1888000102], bits_2: [2980461630, 2183767311, 3958172155, 2408392736, 3246726644, 1883943015] }, Mark::OtherBoss), // 8b
	(FeatureData { x: 11, y: 11, bits_1: [2577806515, 2701241865, 4016630169, 2521631283, 1233192188, 552239846], bits_2: [2575709347, 2166468107, 4016630171, 2450327602, 1234240756, 544908006] }, Mark::Trap), // 2
	// (FeatureData { x: 11, y: 11, bits_1: [2978354834, 539501607, 539496337, 1979973633, 2240809076, 2823311460], bits_2: [3045987986, 539501607, 539496209, 1979973633, 2239760500, 2823311460] }, Mark::Trap), // 8 like fountain??
	(FeatureData { x: 11, y: 11, bits_1: [3045463682, 539501607, 539495953, 1980006401, 2541750388, 2824425572], bits_2: [3049690770, 539500583, 539495953, 1980006401, 2273314934, 2824425572] }, Mark::Trap), // 7
	(FeatureData { x: 11, y: 11, bits_1: [423523259, 419563097, 2040373692, 1205873681, 3984887860, 969734102], bits_2: [155087787, 2567017113, 965585340, 1205877888, 3918901428, 969733943] }, Mark::Treasury), // 1
	(FeatureData { x: 11, y: 11, bits_1: [2166321163, 3607203801, 430741823, 92286080, 3414496436, 807963478], bits_2: [2170515465, 3607203737, 430743099, 58729888, 3416757426, 271190871] }, Mark::Treasury), // 2
	(FeatureData { x: 11, y: 11, bits_1: [152006922, 3271660121, 2848758172, 63716352, 3364196788, 814264650], bits_2: [20410376, 3540092697, 1267505597, 51260544, 3364329908, 814264590] }, Mark::Treasury), // 5
	(FeatureData { x: 11, y: 11, bits_1: [154566139, 184661589, 1770464221, 1181068304, 3381072676, 886961654], bits_2: [155090411, 3389109877, 696527293, 107326592, 3380941732, 885912690] }, Mark::Treasury), // 6
	(FeatureData { x: 11, y: 11, bits_1: [152468955, 117682805, 159779804, 1206172688, 3385138084, 882759126], bits_2: [154566123, 3254892405, 159648188, 132426880, 3385138084, 1955386455] }, Mark::Treasury), // 8
	(FeatureData { x: 11, y: 11, bits_1: [420410746, 2332136029, 1770319325, 38091824, 3381498356, 818525538], bits_2: [20378730, 2298580505, 697100701, 33893536, 3901067764, 820622694] }, Mark::Treasury),
	(FeatureData { x: 11, y: 11, bits_1: [2571071531, 3640690329, 2041178431, 1426205826, 4001697892, 290254646], bits_2: [159338795, 4177596313, 833403963, 360850570, 4019564786, 292319037] }, Mark::Treasury), // dark mode 
	(FeatureData { x: 11, y: 11, bits_1: [671382971, 2197927709, 1810147804, 2211260560, 1233328052, 1888000739], bits_2: [690388011, 2200024845, 3958172062, 2202871936, 1233197044, 1888139874] }, Mark::Scarecrow), // 8
	// (FeatureData { x: 11, y: 11, bits_1: [20348813, 3340873557, 4023160765, 34417921, 3232110516, 820784070], bits_2: [288781965, 2250354441, 1607242557, 42543409, 3366393648, 272507606] }, Mark::Wall),
	// (FeatureData { x: 11, y: 11, bits_1: [288783501, 3942760093, 4293437885, 38350001, 1621497060, 820554614], bits_2: [19298441, 2332143241, 2145952125, 2185832627, 1755518048, 292301558] }, Mark::Wall),
	// (FeatureData { x: 11, y: 11, bits_1: [18316314, 2265030173, 3217852925, 109915265, 1083021300, 820550502], bits_2: [20345994, 3340873485, 3756821437, 2194417824, 3364329460, 812166102] }, Mark::Wall),
	// (FeatureData { x: 11, y: 11, bits_1: [1402920, 3674312985, 2642737596, 2210409856, 1619366308, 814652818], bits_2: [2300010538, 3607204121, 1605161390, 2311203232, 1082627972, 831424538] }, Mark::Wall),
	// (FeatureData { x: 11, y: 11, bits_1: [2165734538, 2518789897, 495819773, 109324433, 3381498100, 946393046], bits_2: [2436248715, 3726749579, 1571658687, 2194417824, 3380942036, 807447254] }, Mark::Wall),
];