export interface PlaceHolderConfig {
    placeholderId: string;
    elementId?: string;
    unrolled?: boolean;
    context?: any;
    isolated?: boolean
};

export interface PrismaOptions {
    onLoaded?: () => void;
    onLoadFailed?: () => void;
    onRedirect: () => void;
    onPopup: () => void;
    storageType?: string
    reloadPopupsOnReset?: boolean;
    language?: string;
    useTranslator?: boolean;
    channel?: string;
    platform?: string;
    pageName?: string;
}

export interface PrismaConfiguration {
    server: string;
    protocol: string;
    port: string;
    app_token: string;
    customer_id: string;
}
