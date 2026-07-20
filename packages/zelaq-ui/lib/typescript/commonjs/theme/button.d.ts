export type ButtonVariant = 'primary' | 'secondary';
export declare function getButtonTokens(variant: ButtonVariant, disabled: boolean): {
    container: {
        minHeight: 44;
        minWidth: 44;
        paddingHorizontal: 16;
        paddingVertical: 12;
        borderRadius: 10;
        backgroundColor: "#ffffff";
        borderColor: "#d1d5db";
        borderWidth: number;
        opacity: number;
    };
    label: {
        fontSize: 16;
        fontWeight: "600";
        lineHeight: 20;
        color: "#111827";
    };
} | {
    container: {
        minHeight: 44;
        minWidth: 44;
        paddingHorizontal: 16;
        paddingVertical: 12;
        borderRadius: 10;
        backgroundColor: "#111827" | "#9ca3af";
        borderColor: string;
        borderWidth: number;
        opacity: number;
    };
    label: {
        fontSize: 16;
        fontWeight: "600";
        lineHeight: 20;
        color: "#ffffff";
    };
};
//# sourceMappingURL=button.d.ts.map