import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
    token: {
        colorPrimary: "#06b6d4",
        colorInfo: "#06b6d4",
        lineWidth: 2,
        borderRadius: 4,
        colorBgBase: "#18181b",
        colorTextBase: "#f2f2f2",
        fontFamily: 'var(--font-saira)',
        paddingSM: 16,
        padding: 16,
    },
    components: {
        Button: {
            fontWeight: 700,
            primaryShadow: 'none'
        },
        Segmented: {
            itemSelectedBg: "#ea580c",
            fontWeightStrong: 600,
        }
    }
}

export default theme;