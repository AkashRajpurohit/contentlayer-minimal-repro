import { allBlogs } from '.contentlayer/data';
import { Blog } from '.contentlayer/types';
import { GetStaticPaths } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Button } from '../components/Button';

const mdxComponents = {
  Button,
};

const DocPage: React.FC<StaticProps> = ({ blog, navInfo }) => {
  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          paddingBottom: 10,
          borderBottom: '1px solid #eee',
        }}
      >
        {navInfo.map(({ path, title }) => (
          <a key={path} href={path} style={{ paddingRight: 6 }}>
            {title}
          </a>
        ))}
      </div>
      <h1>{blog.title}</h1>
      <MDXContent components={mdxComponents} />
    </div>
  );
};

export default DocPage;

type StaticProps = {
  blog: Blog;
  navInfo: { title: string; path: string }[];
};

export const getStaticProps = ({
  params: { slug = [] },
}): { props: StaticProps } => {
  const pagePath = slug.join('/');
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === pagePath)!;

  const navInfo = allBlogs.map((_) => ({
    title: _.title,
    path: `/${_._raw.flattenedPath}`,
  }));

  return { props: { blog, navInfo } };
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: allBlogs.map((_) => `/${_._raw.flattenedPath}`),
  fallback: false,
});
