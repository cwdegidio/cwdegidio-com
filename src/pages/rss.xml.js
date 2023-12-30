import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
    return rss({
        title: 'Curtis W. DeGidio | Software Developer',
        description: 'Personal website of Curtis W. DeGidio. Blog for personal thoughts, web/software/mobile developement, rpgs, and more',
        site: context.site,
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        customData: `<language>en-us</language>`,
    });
}