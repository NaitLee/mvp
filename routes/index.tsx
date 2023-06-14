import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { Status, STATUS_TEXT, acceptsLanguages } from "$std/http/mod.ts";
import { DEFAULT_DATA, i18n, MAX_POST_SIZE, REPO, TEST_DATA } from "../common/constants.ts";

const _ = i18n._;

function metadata_from_partial(query: QueryParam): Metadata {
    if (query.test)
        return TEST_DATA;
    const data: Metadata = Object.create(DEFAULT_DATA);
    data.sources.push([
        {
            url: query.url || '',
            title: query.title || _('video'),
            name: query.name || _('default'),
            poster: query.poster || '',
            authors: query.authors?.split(',') || [_('unknown')]
        }
    ]);
    return data;
}

function loadlang(req: Request) {
    i18n.reset();
    for (const lang of acceptsLanguages(req))
        i18n.append(lang);
}

export const handler: Handlers = {
    GET(req, ctx) {
        loadlang(req);
        const url = new URL(req.url);
        const data: Metadata = metadata_from_partial(Object.fromEntries(url.searchParams) as QueryParam);
        return ctx.render(data);
    },
    async POST(req, ctx) {
        loadlang(req);
        const content_length = parseInt(req.headers.get('Content-Length') || '-1');
        if (content_length > MAX_POST_SIZE || content_length < 0)
            return new Response(null, {
                status: Status.RequestEntityTooLarge,
                statusText: STATUS_TEXT[Status.RequestEntityTooLarge]
            });
        return ctx.render(await req.json());
    }
};

export default function Video(props: PageProps<Metadata>) {
    const data = props.data;
    const active_source = data.sources[data.index][0];
    return (
        <>
            <Head>
                <title>{data.provider} - {active_source.title}</title>
                <link rel="stylesheet" href="main.css" />
                <style>
                    {`
                        :root {
                            --fore: ${data.theme.fore};
                            --theme: ${data.theme.theme};
                            --descent: ${data.theme.descent};
                        }
                    `}
                </style>
            </Head>
            <section id="menu">
                <h1>
                    <span class="title">{active_source.title}</span>
                    <span class="f11-hint">F11</span>
                </h1>
                <aside class="actions">
                    <select tabIndex={5}>
                        {data.sources[data.index].map(src => <option value={src.name}>{_(src.name)}</option>)}
                    </select>
                    <span class="flow-hide">
                        <a class="button" href="#details" tabIndex={1}>{_('details')}</a>
                        <a class="button" href="#comments" tabIndex={2}>{_('comments', data.comments.length)}</a>
                        <a class="button" href="#discover" tabIndex={3}>{_('discover')}</a>
                        <a class="button" href="#about" tabIndex={4}>{_('about')}</a>
                    </span>
                </aside>
            </section>
            <section class="videobox">
                <video preload="auto" src={active_source.url} controls poster={active_source.poster} alt={active_source.title}>
                    {data.sources[data.index].map(src => <source src={src.url} data-name={src.name}></source>)}
                </video>
            </section>
            <section class="sidebars">
                <section id="details">
                    <h2>{active_source.title}</h2>
                    <div class="description">{data.description}</div>
                    <h3>{_('authors', active_source.authors.length)}</h3>
                    <p>{active_source.authors.join(', ')}</p>
                </section>
                <section id="comments">
                    <h2>{_('comments', data.comments.length)}</h2>
                    {data.comments.map(({avatar, author, content}) => <dl>
                        <dt><img src={avatar} alt={author} />{author}</dt>
                        <dd>{content}</dd>
                    </dl>)}
                </section>
                <section id="discover">
                    <h2>{_('discover')}</h2>
                    {data.discover.map(({url, poster, title, authors, duration}) => <div>
                        <img src={poster} alt={title} />
                        <a href={url}>{title}</a>
                        <span>{authors.join(', ')}</span>
                        <span>{duration}</span>
                    </div>)}
                </section>
                <section id="about">
                    <h2>{data.provider}</h2>
                    <p>{data.provider_intro}</p>
                    <p><a href={REPO}>{_('powered-by-mvp')}</a></p>
                    <p><a href={data.license_link}>{_('licensed-under-0', _(data.license))}</a></p>
                    <p><a href={data.source_code_link}>{_('obtain-source-code')}</a></p>
                </section>
                <div class="sidebar-actions flow-hide">
                    <a class="button back" href="#" tabIndex={6}>← {_('back')}</a>
                </div>
            </section>
        </>
    );
}
