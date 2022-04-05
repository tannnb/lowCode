const fontFamilyArray = [
    { text: '宋体', value: '"SimSun","STSong"' },
    { text: '黑体', value: '"SimHei","STHeiti"' },
    { text: '楷体', value: '"KaiTi","STKaiti"' },
    { text: '仿宋', value: '"FangSong","STFangsong"' }
];
const fontFamilyOptions = fontFamilyArray.map((font) => {
    return {
        value: font.value,
        text: (<span style={{ fontFamily: font.value }}>{font.text}</span>)
    };
});
export const mapPropsToForms = {
    text: {
        text: '文本',
        component: 'a-textarea',
        extraProps: { rows: 3 },
        afterTransform: (e) => e.target.value
    },
    fontSize: {
        text: '字号',
        component: 'a-input-number',
        initalTransform: (value) => parseInt(value),
        afterTransform: (e) => (e ? `${e}px` : '')
    },
    lineHeight: {
        text: '行高',
        component: 'a-slider',
        extraProps: { min: 0, max: 3, step: 0.1 },
        initalTransform: (value) => parseFloat(value),
        afterTransform: (e) => e.toString()
    },
    textAlign: {
        text: '对齐',
        component: 'a-raido-group',
        subComponent: 'a-radio-button',
        options: [
            { value: 'left', text: '左' },
            { value: 'center', text: '中' },
            { value: 'right', text: '右' }
        ],
        afterTransform: (e) => e.target.value
    },
    fontFamily: {
        text: '字体',
        component: 'a-select',
        subComponent: 'a-select-option',
        options: [{ text: '无', value: '' }, ...fontFamilyOptions]
    }
};
//# sourceMappingURL=propsMap.jsx.map