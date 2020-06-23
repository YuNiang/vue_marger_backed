export const TEAM_TYPE = [
  { label: 'LPL', value: '1' },
  { label: 'LDL', value: '2' }
];

export const CLOTHES_SIZE = [
  { label: 'XS', value: 'XS' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' },
  { label: 'XXXL', value: 'XXXL' },
  { label: 'XXXXL', value: 'XXXXL' },
];

export const MOUSE_DRIVER = [
  { label: '是', value: '1' },
  { label: '否', value: '0' }
];

export const SHOES_SIZE_MAP = {
  '233':'脚长233mm 欧码38 美码5.5',
  '237':'脚长237mm 欧码38.5 美码6',
  '241':'脚长241mm 欧码39 美码6.5',
  '245':'脚长245mm 欧码40 美码7',
  '250':'脚长250mm 欧码40.5 美码7.5',
  '254':'脚长254mm 欧码41 美码8',
  '258':'脚长258mm 欧码42 美码8.5',
  '262':'脚长262mm 欧码42.5 美码9',
  '267':'脚长267mm 欧码43 美码9.5',
  '271':'脚长271mm 欧码44 美码10',
  '275':'脚长275mm 欧码44.5 美码10.5',
  '279':'脚长279mm 欧码45 美码11',
  '283':'脚长283mm 欧码45.5 美码11.5',
  '288':'脚长288mm 欧码46 美码12',
  '292':'脚长292mm 欧码46.5 美码12.5',
}

export const PLAYER_IDENTITY_MAP = {
  1:"自由选手",
  2:"青训营选手",
  3:"新人选手",
  4:"转会选手",
  5:"借调选手",
  6:"上调选手",
  7:"下放选手",
}

export const SHOES_SIZE= [
  {
    label: '脚长233mm 欧码38 美码5.5',
    value: '233',
  },
  {
    label: '脚长237mm 欧码38.5 美码6',
    value: '237',
  },
  {
    label: '脚长241mm 欧码39 美码6.5',
    value: '241',
  },
  {
    label: '脚长245mm 欧码40 美码7',
    value: '245'
  },
  {
    label: '脚长250mm 欧码40.5 美码7.5',
    value: '250'
  },
  {
    label: '脚长254mm 欧码41 美码8',
    value: '254'
  },
  {
    label: '脚长258mm 欧码42 美码8.5',
    value: '258'
  },
  {
    label: '脚长262mm 欧码42.5 美码9',
    value: '262'
  },
  {
    label: '脚长267mm 欧码43 美码9.5',
    value: '267'
  },
  {
    label: '脚长271mm 欧码44 美码10',
    value: '271'
  },
  {
    label: '脚长275mm 欧码44.5 美码10.5',
    value: '275'
  },
  {
    label: '脚长279mm 欧码45 美码11',
    value: '279'
  },
  {
    label: '脚长283mm 欧码45.5 美码11.5',
    value: '283'
  },
  {
    label: '脚长288mm 欧码46 美码12',
    value: '288'
  },
  {
    label: '脚长292mm 欧码46.5 美码12.5',
    value: '292'
  }
];

export const PLAYER_IDENTITY = [
  {
    label: '自由选手',
    value: '1'
  },
  {
    label: '青训营选手',
    value: '2'
  },
  {
    label: '新人选手',
    value: '3'
  },
  {
    label: '转会选手',
    value: '4'
  },
  {
    label: '借调选手',
    value: '5'
  },
  {
    label: '上调选手',
    value: '6'
  },
  {
    label: '下放选手',
    value: '7'
  }
];

export const GAME_POSITION = [
  { label: '上单', value: 'TOP' },
  { label: '打野', value: 'JUG' },
  { label: '中单', value: 'MID' },
  { label: '辅助', value: 'SUP' },
  { label: '射手', value: 'AD' }
];

export const GAME_POSITION_MAP = {
  'TOP':'上单',
  'JUG':'打野',
  'MID':'中单',
  'SUP':'辅助',
  'AD' :'射手'
}

export const ACCEPT_TYPE = `image/png, application/pdf, image/jpg, image/jpeg`;

export const ITYPE_LIST = [
  { label: '选手注册', value: "100" },
  { label: '选手解约', value: "110" },
  { label: '选手上调', value: "120" },
  { label: '选手转会', value: "130" },
  { label: '选手下放', value: "140" },
  { label: '教练注册', value: "150" },
  { label: '教练解约', value: "160" },
  { label: '选手修改', value: "170" },
  { label: '选手借调', value: "180" },
  { label: '选手返还', value: "190" },
  { label: '教练修改', value: "200" },
];

export const ROLE_LIST = [
  { label: '教练', value: 'coach' },
  { label: '选手', value: 'player' }
];

export const STATUS_LIST = [
  { label: '待审核', value: '0' },
  { label: '已拒绝', value: '-1' },
  { label: '已完成', value: '1' },
];

export const STATUS_LIST_MAP = {
  '0':"待审核",
  '-1':"已拒绝",
  '1':"已完成",

};


export const ITYPE_LIST_MAP = {
  "100": '选手注册',
  "110": '选手解约',
  "120": '选手上调',
  "130": '选手转会',
  "140": '选手下放',
  "150": '教练注册',
  "160": '教练解约',
  "170": '选手修改',
  "180": '选手借调',
  "190": '选手返还',
  "200": '教练修改'
};

export const COUNTRY_MAP = {
  '+86' : { value: '+86', name: '中国', local: '中国' },
  '+001' : { value: '+001', name: '美国', local: 'United States' },
  '+1' : { value: '+1', name: '加拿大', local: 'Canada' },
  '+1242' : { value: '+1242', name: '巴哈马', local: 'Bahamas' },
  '+1246' : { value: '+1246', name: '巴巴多斯', local: 'Barbados' },
  '+1264' : { value: '+1264', name: '安圭拉', local: 'Anguilla' },
  '+1268' : { value: '+1268', name: '安提瓜和巴布达', local: 'Antigua and Barbuda' },
  '+1284' : { value: '+1284', name: '英属维京群岛', local: 'British Virgin Islands' },
  '+1340' : { value: '+1340', name: '美属维京群岛', local: 'U.S. Virgin Islands' },
  '+1345' : { value: '+1345', name: '开曼群岛', local: 'Cayman Islands' },
  '+1441' : { value: '+1441', name: '百慕大', local: 'Bermuda' },
  '+1473' : { value: '+1473', name: '格林纳达', local: 'Grenada' },
  '+1649' : { value: '+1649', name: '特克斯和凯科斯群岛', local: 'Turks and Caicos Islands' },
  '+1664' : { value: '+1664', name: '蒙塞拉特', local: 'Montserrat' },
  '+1670' : { value: '+1670', name: '北马里亚纳群岛', local: 'Northern Mariana Islands' },
  '+1671' : { value: '+1671', name: '关岛', local: 'Guam' },
  '+1684' : { value: '+1684', name: '美属萨摩亚', local: 'American Samoa' },
  '+1721' : { value: '+1721', name: '荷属圣马丁', local: 'Sint Maarten' },
  '+1758' : { value: '+1758', name: '圣卢西亚', local: 'Saint Lucia' },
  '+1767' : { value: '+1767', name: '多米尼克', local: 'Dominica' },
  '+1784' : { value: '+1784', name: '圣文森特和格林纳丁斯', local: 'Saint Vincent and the Grenadines' },
  '+1787' : { value: '+1787', name: '波多黎各', local: 'Puerto Rico' },
  '+1809' : { value: '+1809', name: '多米尼加共和国', local: 'República Dominicana' },
  '+1868' : { value: '+1868', name: '特立尼达和多巴哥', local: 'Trinidad and Tobago' },
  '+1869' : { value: '+1869', name: '圣基茨和尼维斯', local: 'Saint Kitts and Nevis' },
  '+1876' : { value: '+1876', name: '牙买加', local: 'Jamaica' },
  '+20' : { value: '+20', name: '埃及', local: '&#8235;مصر&#8236;' },
  '+211' : { value: '+211', name: '南苏丹', local: '&#8235;جنوب السودان&#8236;' },
  '+212' : { value: '+212', name: '摩洛哥', local: '&#8235;المغرب&#8236;' },
  '+213' : { value: '+213', name: '阿尔及利亚', local: '&#8235;الجزائر&#8236;' },
  '+216' : { value: '+216', name: '突尼斯', local: '&#8235;تونس&#8236;' },
  '+218' : { value: '+218', name: '利比亚', local: '&#8235;ليبيا&#8236;' },
  '+220' : { value: '+220', name: '冈比亚', local: 'Gambia' },
  '+221' : { value: '+221', name: '塞内加尔', local: 'Sénégal' },
  '+222' : { value: '+222', name: '毛里塔尼亚', local: '&#8235;موريتانيا&#8236;' },
  '+223' : { value: '+223', name: '马里', local: 'Mali' },
  '+224' : { value: '+224', name: '几内亚', local: 'Guinée' },
  '+225' : { value: '+225', name: '科特迪瓦', local: 'Côte d’Ivoire' },
  '+226' : { value: '+226', name: '布基纳法索', local: 'Burkina Faso' },
  '+227' : { value: '+227', name: '尼日尔', local: 'Nijar' },
  '+228' : { value: '+228', name: '多哥', local: 'Togo' },
  '+229' : { value: '+229', name: '贝宁', local: 'Bénin' },
  '+230' : { value: '+230', name: '毛里求斯', local: 'Moris' },
  '+231' : { value: '+231', name: '利比里亚', local: 'Liberia' },
  '+232' : { value: '+232', name: '塞拉利昂', local: 'Sierra Leone' },
  '+233' : { value: '+233', name: '加纳', local: 'Gaana' },
  '+234' : { value: '+234', name: '尼日利亚', local: 'Nigeria' },
  '+235' : { value: '+235', name: '乍得', local: 'Tchad' },
  '+236' : { value: '+236', name: '中非共和国', local: 'République centrafricaine' },
  '+237' : { value: '+237', name: '喀麦隆', local: 'Cameroun' },
  '+238' : { value: '+238', name: '佛得角', local: 'Kabu Verdi' },
  '+239' : { value: '+239', name: '圣多美和普林西比', local: 'São Tomé e Príncipe' },
  '+240' : { value: '+240', name: '赤道几内亚', local: 'Guinea Ecuatorial' },
  '+241' : { value: '+241', name: '加蓬', local: 'Gabon' },
  '+242' : { value: '+242', name: '刚果（布）', local: 'Congo-Brazzaville' },
  '+243' : { value: '+243', name: '刚果（金）', local: 'Jamhuri ya Kidemokrasia ya Kongo' },
  '+244' : { value: '+244', name: '安哥拉', local: 'Angola' },
  '+245' : { value: '+245', name: '几内亚比绍', local: 'Guiné Bissau' },
  '+246' : { value: '+246', name: '英属印度洋领地', local: 'British Indian Ocean Territory' },
  '+247' : { value: '+247', name: '阿森松岛', local: 'Ascension Island' },
  '+248' : { value: '+248', name: '塞舌尔', local: 'Seychelles' },
  '+249' : { value: '+249', name: '苏丹', local: '&#8235;السودان&#8236;' },
  '+250' : { value: '+250', name: '卢旺达', local: 'Rwanda' },
  '+251' : { value: '+251', name: '埃塞俄比亚', local: 'Ethiopia' },
  '+252' : { value: '+252', name: '索马里', local: 'Soomaaliya' },
  '+253' : { value: '+253', name: '吉布提', local: 'Djibouti' },
  '+254' : { value: '+254', name: '肯尼亚', local: 'Kenya' },
  '+255' : { value: '+255', name: '坦桑尼亚', local: 'Tanzania' },
  '+256' : { value: '+256', name: '乌干达', local: 'Uganda' },
  '+257' : { value: '+257', name: '布隆迪', local: 'Uburundi' },
  '+258' : { value: '+258', name: '莫桑比克', local: 'Moçambique' },
  '+260' : { value: '+260', name: '赞比亚', local: 'Zambia' },
  '+261' : { value: '+261', name: '马达加斯加', local: 'Madagasikara' },
  '+262' : { value: '+262', name: '留尼汪', local: 'Réunion' },
  '+263' : { value: '+263', name: '津巴布韦', local: 'Zimbabwe' },
  '+264' : { value: '+264', name: '纳米比亚', local: 'Namibia' },
  '+265' : { value: '+265', name: '马拉维', local: 'Malawi' },
  '+266' : { value: '+266', name: '莱索托', local: 'Lesotho' },
  '+267' : { value: '+267', name: '博茨瓦纳', local: 'Botswana' },
  '+268' : { value: '+268', name: '斯威士兰', local: 'Swaziland' },
  '+269' : { value: '+269', name: '科摩罗', local: '&#8235;جزر القمر&#8236;' },
  '+27' : { value: '+27', name: '南非', local: 'South Africa' },
  '+290' : { value: '+290', name: '圣赫勒拿', local: 'Saint Helena' },
  '+291' : { value: '+291', name: '厄立特里亚', local: 'Eritrea' },
  '+297' : { value: '+297', name: '阿鲁巴', local: 'Aruba' },
  '+298' : { value: '+298', name: '法罗群岛', local: 'Føroyar' },
  '+299' : { value: '+299', name: '格陵兰', local: 'Kalaallit Nunaat' },
  '+30' : { value: '+30', name: '希腊', local: 'Ελλάδα' },
  '+31' : { value: '+31', name: '荷兰', local: 'Nederland' },
  '+32' : { value: '+32', name: '比利时', local: 'België' },
  '+33' : { value: '+33', name: '法国', local: 'France' },
  '+34' : { value: '+34', name: '西班牙', local: 'España' },
  '+350' : { value: '+350', name: '直布罗陀', local: 'Gibraltar' },
  '+351' : { value: '+351', name: '葡萄牙', local: 'Portugal' },
  '+352' : { value: '+352', name: '卢森堡', local: 'Luxembourg' },
  '+353' : { value: '+353', name: '爱尔兰', local: 'Ireland' },
  '+354' : { value: '+354', name: '冰岛', local: 'Ísland' },
  '+355' : { value: '+355', name: '阿尔巴尼亚', local: 'Shqipëria' },
  '+356' : { value: '+356', name: '马耳他', local: 'Malta' },
  '+357' : { value: '+357', name: '塞浦路斯', local: 'Κύπρος' },
  '+358' : { value: '+358', name: '芬兰', local: 'Suomi' },
  '+359' : { value: '+359', name: '保加利亚', local: 'България' },
  '+36' : { value: '+36', name: '匈牙利', local: 'Magyarország' },
  '+370' : { value: '+370', name: '立陶宛', local: 'Lietuva' },
  '+371' : { value: '+371', name: '拉脱维亚', local: 'Latvija' },
  '+372' : { value: '+372', name: '爱沙尼亚', local: 'Eesti' },
  '+373' : { value: '+373', name: '摩尔多瓦', local: 'Republica Moldova' },
  '+374' : { value: '+374', name: '亚美尼亚', local: 'Հայաստան' },
  '+375' : { value: '+375', name: '白俄罗斯', local: 'Беларусь' },
  '+376' : { value: '+376', name: '安道尔', local: 'Andorra' },
  '+377' : { value: '+377', name: '摩纳哥', local: 'Monaco' },
  '+378' : { value: '+378', name: '圣马力诺', local: 'San Marino' },
  '+379' : { value: '+379', name: '梵蒂冈', local: 'Città del Vaticano' },
  '+380' : { value: '+380', name: '乌克兰', local: 'Україна' },
  '+381' : { value: '+381', name: '塞尔维亚', local: 'Србија' },
  '+382' : { value: '+382', name: '黑山共和国', local: 'Crna Gora' },
  '+385' : { value: '+385', name: '克罗地亚', local: 'Hrvatska' },
  '+386' : { value: '+386', name: '斯洛文尼亚', local: 'Slovenija' },
  '+387' : { value: '+387', name: '波斯尼亚和黑塞哥维那', local: 'Босна и Херцеговина' },
  '+389' : { value: '+389', name: '马其顿', local: 'Македонија' },
  '+39' : { value: '+39', name: '意大利', local: 'Italia' },
  '+40' : { value: '+40', name: '罗马尼亚', local: 'România' },
  '+41' : { value: '+41', name: '瑞士', local: 'Schweiz' },
  '+420' : { value: '+420', name: '捷克共和国', local: 'Česká republika' },
  '+421' : { value: '+421', name: '斯洛伐克', local: 'Slovensko' },
  '+423' : { value: '+423', name: '列支敦士登', local: 'Liechtenstein' },
  '+43' : { value: '+43', name: '奥地利', local: 'Österreich' },
  '+44' : { value: '+44', name: '英国', local: 'United Kingdom' },
  '+45' : { value: '+45', name: '丹麦', local: 'Danmark' },
  '+46' : { value: '+46', name: '瑞典', local: 'Sverige' },
  '+47' : { value: '+47', name: '挪威', local: 'Norge' },
  '+48' : { value: '+48', name: '波兰', local: 'Polska' },
  '+49' : { value: '+49', name: '德国', local: 'Deutschland' },
  '+500' : { value: '+500', name: '福克兰群岛', local: 'Falkland Islands [Islas Malvinas]' },
  '+501' : { value: '+501', name: '伯利兹', local: 'Belize' },
  '+502' : { value: '+502', name: '危地马拉', local: 'Guatemala' },
  '+503' : { value: '+503', name: '萨尔瓦多', local: 'El Salvador' },
  '+504' : { value: '+504', name: '洪都拉斯', local: 'Honduras' },
  '+505' : { value: '+505', name: '尼加拉瓜', local: 'Nicaragua' },
  '+506' : { value: '+506', name: '哥斯达黎加', local: 'Costa Rica' },
  '+507' : { value: '+507', name: '巴拿马', local: 'Panamá' },
  '+508' : { value: '+508', name: '圣皮埃尔和密克隆群岛', local: 'Saint-Pierre-et-Miquelon' },
  '+509' : { value: '+509', name: '海地', local: 'Haiti' },
  '+51' : { value: '+51', name: '秘鲁', local: 'Perú' },
  '+52' : { value: '+52', name: '墨西哥', local: 'México' },
  '+53' : { value: '+53', name: '古巴', local: 'Cuba' },
  '+54' : { value: '+54', name: '阿根廷', local: 'Argentina' },
  '+55' : { value: '+55', name: '巴西', local: 'Brasil' },
  '+56' : { value: '+56', name: '智利', local: 'Chile' },
  '+57' : { value: '+57', name: '哥伦比亚', local: 'Colombia' },
  '+58' : { value: '+58', name: '委内瑞拉', local: 'Venezuela' },
  '+590' : { value: '+590', name: '法属圣马丁', local: 'Saint-Martin [partie française]' },
  '+591' : { value: '+591', name: '玻利维亚', local: 'Bolivia' },
  '+592' : { value: '+592', name: '圭亚那', local: 'Guyana' },
  '+593' : { value: '+593', name: '厄瓜多尔', local: 'Ecuador' },
  '+594' : { value: '+594', name: '法属圭亚那', local: 'Guyane française' },
  '+595' : { value: '+595', name: '巴拉圭', local: 'Paraguay' },
  '+596' : { value: '+596', name: '马提尼克', local: 'Martinique' },
  '+597' : { value: '+597', name: '苏里南', local: 'Suriname' },
  '+598' : { value: '+598', name: '乌拉圭', local: 'Uruguay' },
  '+599' : { value: '+599', name: '荷兰加勒比', local: 'Caribbean Netherlands' },
  '+60' : { value: '+60', name: '马来西亚', local: 'Malaysia' },
  '+61' : { value: '+61', name: '澳大利亚', local: 'Australia' },
  '+62' : { value: '+62', name: '印度尼西亚', local: 'Indonesia' },
  '+63' : { value: '+63', name: '菲律宾', local: 'Philippines' },
  '+64' : { value: '+64', name: '新西兰', namlocale: 'New Zealand' },
  '+65' : { value: '+65', name: '新加坡', local: 'Singapore' },
  '+66' : { value: '+66', name: '泰国', local: 'ไทย' },
  '+670' : { value: '+670', name: '东帝汶', local: 'Timor-Leste' },
  '+6723' : { value: '+6723', name: '诺福克岛', local: 'Norfolk Island' },
  '+673' : { value: '+673', name: '文莱', local: 'Brunei' },
  '+674' : { value: '+674', name: '瑙鲁', local: 'Nauru' },
  '+675' : { value: '+675', name: '巴布亚新几内亚', local: 'Papua New Guinea' },
  '+676' : { value: '+676', name: '汤加', local: 'Tonga' },
  '+677' : { value: '+677', name: '所罗门群岛', local: 'Solomon Islands' },
  '+678' : { value: '+678', name: '瓦努阿图', local: 'Vanuatu' },
  '+679' : { value: '+679', name: '斐济', local: 'Fiji' },
  '+680' : { value: '+680', name: '帕劳', local: 'Palau' },
  '+681' : { value: '+681', name: '瓦利斯和富图纳', local: 'Wallis and Futuna' },
  '+682' : { value: '+682', name: '库克群岛', local: 'Cook Islands' },
  '+683' : { value: '+683', name: '纽埃', local: 'Niue' },
  '+685' : { value: '+685', name: '萨摩亚', local: 'Samoa' },
  '+686' : { value: '+686', name: '基里巴斯', local: 'Kiribati' },
  '+687' : { value: '+687', name: '新喀里多尼亚', local: 'Nouvelle-Calédonie' },
  '+688' : { value: '+688', name: '图瓦卢', local: 'Tuvalu' },
  '+689' : { value: '+689', name: '法属波利尼西亚', local: 'Polynésie française' },
  '+690' : { value: '+690', name: '托克劳', local: 'Tokelau' },
  '+691' : { value: '+691', name: '密克罗尼西亚联邦', local: 'Micronesia' },
  '+692' : { value: '+692', name: '马绍尔群岛', local: 'Marshall Islands' },
  '+7' : { value: '+7', name: '俄罗斯', local: 'Россия' },
  '+81' : { value: '+81', name: '日本', local: '日本' },
  '+82' : { value: '+82', name: '韩国', local: '대한민국' },
  '+84' : { value: '+84', name: '越南', local: 'Việt Nam' },
  '+850' : { value: '+850', name: '朝鲜', local: '조선 민주주의 인민 공화국' },
  '+852' : { value: '+852', name: '香港', local: '香港' },
  '+853' : { value: '+853', name: '澳门', local: '澳門' },
  '+855' : { value: '+855', name: '柬埔寨', local: 'កម្ពុជា' },
  '+856' : { value: '+856', name: '老挝', local: 'ສ.ປ.ປ ລາວ' },
  '+880' : { value: '+880', name: '孟加拉国', local: 'বাংলাদেশ' },
  '+886' : { value: '+886', name: '台湾', local: '台灣' },
  '+90' : { value: '+90', name: '土耳其', local: 'Türkiye' },
  '+91' : { value: '+91', name: '印度', local: 'भारत' },
  '+92' : { value: '+92', name: '巴基斯坦', local: '&#8235;پاکستان&#8236;' },
  '+93' : { value: '+93', name: '阿富汗', local: '&#8235;افغانستان&#8236;' },
  '+94' : { value: '+94', name: '斯里兰卡', local: 'ශ්&zwj;රී ලංකාව' },
  '+95' : { value: '+95', name: '缅甸', local: 'မြန်မာ' },
  '+960' : { value: '+960', name: '马尔代夫', local: 'Maldives' },
  '+961' : { value: '+961', name: '黎巴嫩', local: '&#8235;لبنان&#8236;' },
  '+962' : { value: '+962', name: '约旦', local: '&#8235;الأردن&#8236;' },
  '+963' : { value: '+963', name: '叙利亚', local: '&#8235;سوريا&#8236;' },
  '+964' : { value: '+964', name: '伊拉克', local: '&#8235;العراق&#8236;' },
  '+965' : { value: '+965', name: '科威特', local: '&#8235;الكويت&#8236;' },
  '+966' : { value: '+966', name: '沙特阿拉伯', local: '&#8235;المملكة العربية السعودية&#8236;' },
  '+967' : { value: '+967', name: '也门', local: '&#8235;اليمن&#8236;' },
  '+968' : { value: '+968', name: '阿曼', local: '&#8235;عُمان&#8236;' },
  '+970' : { value: '+970', name: '巴勒斯坦', local: '&#8235;فلسطين&#8236;' },
  '+971' : { value: '+971', name: '阿拉伯联合酋长国', local: '&#8235;الإمارات لعربية المتحدة&#8236;' },
  '+972' : { value: '+972', name: '以色列', local: '&#8235;ישראל&#8236;' },
  '+973' : { value: '+973', name: '巴林', local: '&#8235;البحرين&#8236;' },
  '+974' : { value: '+974', name: '卡塔尔', local: '&#8235;قطر&#8236;' },
  '+975' : { value: '+975', name: '不丹', local: 'འབྲུག' },
  '+98' : { value: '+98', name: '伊朗', local: '&#8235;ایران&#8236;' },
  '+992' : { value: '+992', name: '塔吉克斯坦', local: 'Tajikistan' },
  '+993' : { value: '+993', name: '土库曼斯坦', local: 'Turkmenistan' },
  '+994' : { value: '+994', name: '阿塞拜疆', local: 'Azərbaycan' },
  '+995' : { value: '+995', name: '格鲁吉亚', local: 'საქართველო' },
  '+996' : { value: '+996', name: '吉尔吉斯斯坦', local: 'Kyrgyzstan' },
  '+998' : { value: '+998', name: '乌兹别克斯坦', local: 'Ўзбекистон' }
};

export const FILE_LIST = [
  { label: '《选手服务协议》', value: 100 },
  { label: '《选手资格授权书》', value: 110 },
  { label: '《英雄联盟抵制假赛与赌赛的声明》', value: 120 },
  { label: '身份证明文件', value: 130 },
  { label: '护照（LPL选手）', value: 140 },
  { label: '《选手注册申请表》', value: 150 },
  { label: '《教练注册申请表》', value: 160 }
];
