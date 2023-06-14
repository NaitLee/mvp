
type QueryParam = {
    url: string,
    title: string,
    poster: string,
    provider: string,
    authors: string,
    name: string,
    metadata: string,
    test: string
};

type Source = {
    url: string,
    name: string,
    title: string,
    poster: string,
    authors: string[],
};

type Metadata = {
    version: number,
    sources: Source[][],
    index: number,
    provider: string,
    provider_intro: string,
    description: string,
    theme: {
        fore: string,
        theme: string,
        descent: string
    },
    comments: {
        avatar: string,
        author: string,
        content: string,
    }[],
    discover: {
        url: string,
        poster: string,
        title: string,
        authors: string[],
        duration: string
    }[],
    license: string,
    license_link: string,
    source_code_link: string
};
