---
title: Building a Blogging System for My Personal Website
date: "2024-11-07"
description: "So naturally, as a programmer, I wanted to create my own blog. And like any self-respecting programmer, I decided to build my own blogging system from scratch."
---

I love reading blogs. There's something special about finding people smarter than yourself and learning from their experiences and insights through their writing. So naturally, as a programmer, I wanted to create my own blog. And like any self-respecting programmer, I decided to build my own blogging system from scratch. Like a personal rite of sorts.

## The Journey from HTML to Markdown

A blog is just a wall of text and maybe a picture here and there. You could technically create a blog using pure HTML. It might look something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My awesome blog</title>
  </head>
  <body>
    <h1>Building a Blogging System</h1>
    <p>
      I love <strong>blogs</strong>. There's something special about finding
      people smarter than yourself and learning from their experiences...
    </p>
  </body>
</html>
```

But for obvious reasons, this sucks. First of all, I hate writing in HTML. I know, even as a web developer, writing in HTML is just so painful. It's verbose, error-prone, and pulls your focus away from what matters most: the content.

This realization led me to explore static site generation using Markdown files. The approach offers three significant advantages:

1. **Performance**: Pages are pre-rendered at build time, resulting in lightning-fast load times without server-side processing for each request.
2. **Security**: With no server-side code execution, the attack surface is minimal, reducing potential vulnerabilities.
3. **Simplicity**: No need to manage databases or complex backend infrastructure.

Besides, I really like writing in Markdown. A lot more intuitive, and it's all comprised of just text characters, nothing fancy. The blog you are reading right now was originally written in Markdown and is used as a Markdown file.

In this reading I'll show you how to set up a basic blog that is streamlined and easy to use. One of the big requirements of this system is to ditch the traditional CMS; I'm not wanting to dealing with that. This system should read Markdown files stored in a folder, processes them to display as blog posts, and organizes them by creation date in order to stick with this website's static nature and have minimal server dependencies. Yeah, it's gonna be good.

## Prerequisites

- Basic knowledge of React, nothing crazy.

## What should blogs look like?

The core idea is to use Markdown files as the single source of truth for our blog posts. Each post begins with "frontmatter" – metadata that provides structured information about the content:

```markdown
---
title: epic blog of epic proportions
date: "2024-11-03"
description: "this is my first blog!"
tags: ["blog", "awesomeness"]
---

# This is a blog!
```

This metadata is should be then parsed and structured using a TypeScript interface:

```typescript
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}
```

## Processing Metadata

The real magic happens in `parseMetadata`, which uses the [`gray-matter`](https://github.com/jonschlinkert/gray-matter/tree/master) library to separate frontmatter from content:

```typescript
import matter from "gray-matter";

export function parseMetadata(id: string, content: string): BlogPost {
  try {
    const { data, content: markdownContent } = matter(content);
    return {
      id,
      title: data.title || "Untitled",
      date: data.date || "Unknown Date",
      description: data.description || "",
      tags: data.tags || [],
      content: markdownContent,
    };
  } catch (error) {
    console.error(`Error parsing markdown for ${id}:`, error);
    throw error;
  }
}
```

This will be used eventually in my `posts.ts` file, which returns all the blog posts in the `blog` directory.

I use Vite's `import.meta.glob` which dynamically imports multiple files based on a pattern. In this case, it's importing all `.md` files from the `blog` folder. This approach means new posts can be added by simply dropping a Markdown file into the folder.

```typescript
// posts.ts
import { parseMetadata } from "@/lib/utils";

const modules = import.meta.glob("./blog/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});
```

After parsing the Markdown files, we sort them by date, and then we export them as an array of `blogPosts`.

```typescript
const posts = Object.entries(modules).map(([path, content]) => {
  const id = path.split("/").pop()?.replace(".md", "") || "";

  // parses the Markdown file with the function we wrote earlier
  return parseMetadata(id, content as string);
});

export const blogPosts = posts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
```

## The Blog Interface

We can now grab our posts! Let's display them for users like you. The blog interface consists of two main components: `BlogIndex`, which is a list view of all posts, and `BlogPost`, which displays individual post pages. For the list view, we use shadcn's Card component to create an elegant grid of blog posts:

```tsx
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6">
        {blogPosts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((post) => (
            <div key={post.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <Link to={`/blog/${post.id}`}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-thin select-none"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
```

`postId` is retrieved from the URL using `useParams` (oh by the way, I'm using React Router). `post` looks for a post within `blogPosts` where the `id` matches `postId`. We then grab the theme to look at whether or not the site is in dark or light mode. If we can't find the post, we'll navigate to the 404 not found page.

```tsx
import { useParams, Navigate } from "react-router-dom";
import { blogPosts } from "@/data/posts";
import { useTheme } from "@/hooks/ThemeContext";

export function BlogPost() {
  const { postId } = useParams();
  const post = blogPosts.find((p) => p.id === postId);
  const { theme } = useTheme();

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  ...
```

We now need to style the Markdown file with [`ReactMarkdown`](https://github.com/remarkjs/react-markdown#readme), which is a React wrapper for [Remark](https://remark.js.org/). Remark parses Markdown to HTML. I'm also integrating code highlighting, because who doesn't like code snippets?

```tsx
  ...

  const markdownComponents: Components = {
    // Here we'll define custom styles and behaviors for specific tags like <code>
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
    } & ClassAttributes<HTMLElement> &
      HTMLAttributes<HTMLElement> &
      ExtraProps) => {
      const match = /language-(\w+)/.exec(className || "");

      if (!inline && match) {
        const language = match[1];
        return (
          <Highlight // import { Highlight, themes } from "prism-react-renderer";
            code={String(children).replace(/\n$/, "")}
            language={language}
            theme={
              theme === "dark" ? themes.jettwaveDark : themes.jettwaveLight
            }
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cn(
                  className,
                  "p-4 rounded-lg overflow-x-auto text-sm my-4"
                )}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    <span className="text-gray-500 mr-4 select-none">
                      {i + 1}
                    </span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        );
      }

      return (
        <code
          className={cn("px-1.5 py-0.5 rounded-md bg-muted", className)}
          {...props}
        >
          {children}
        </code>
      );
    },
```

It's a lot, right? But it's not doing anything too too crazy. `markdownComponents` defines custom styles and behaviors for specific markdown elements, such as `code`, `a` (link), and `blockquote`. For inline code, I'm using the [`prism-react-renderer`](https://github.com/FormidableLabs/prism-react-renderer#readme) library, which tokenizes code using Prism and renders it out using the `Highlight` component.

The one semi-interesting thing about the anchor tag is that it checks whether or not the link is external or internal. This way I can add a little icon that indicates this. That seems to be sort of the convention, but I stole the idea from Obsidian:

```tsx
a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          className={cn(
            "text-primary underline decoration-primary/30 underline-offset-2",
            "transition-all duration-200",
            "hover:decoration-primary/100 hover:text-primary/80",
            "inline-flex items-center gap-1"
          )}
          {...props}
        >
          {children}
          {isExternal && <ExternalLink className="h-3 w-3 inline-block" />}
        </a>
      );
    },
```

The rest of the implementation is just standard stuff. You can style it however you like, of course; here I kept it pretty simple.

```tsx
    ...

    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/20 pl-4 italic mb-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
  };
```

After that, we can just put it all together now.

```tsx
return (
    <article
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground mb-4">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              className="font-thin select-none"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <div className="max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

```

`remarkGfm` is a plugin for additional markdown features (like tables, strikethrough, etc.), which mostly remain not implemented as of now. However, in the future, when necessity strikes, I'll update the current code to adjust for that.

## Future Improvements... ?

While the current implementation is functional, there's room for enhancement:

- Adding support for more remark plugins like `remark-math` and `remark-toc` is on the "when the time comes" list.
- Adding SEO optimization through metadata is on the "I really should, honestly" list.
- Implementing some sort of search or sorting by tags function is on the "oooh, maybe" list.
- Adding a commenting system is on the "eh... probably not" list.

## Conclusion

In the end, that's really all there is to it. Now I can drop this Markdown file into my blog directory, and it will populate all by itself, and then I can git push into production, and Bob's your uncle. The end result is a lightweight, fast, and maintainable solution that lets me focus on writing while providing a great experience for readers like you. ;)

Building a custom blogging system has been an enlightening journey. Really, I learned a lot! My website is open source, so feel free to check out the implementation yourself. There are a few bits I left out, mostly animation using Framer Motion that wasn't really important.

[Check out my portfolio repository here!](https://github.com/samanshaiza004/portfolio-2024)

_Thanks for reading!_
