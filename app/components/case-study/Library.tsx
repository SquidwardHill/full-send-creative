<section className="mt-24 text-center max-w-screen-lg mx-auto">
{/* <h2 className="text-cream-100">Case Studies</h2> */}
<p className="text-cream-200 text-xl pb-6">Some things I've made.</p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-2">
  {caseStudies.map(
    (cs: {
      id: string;
      images: Array<{ url: string; alt?: string | null }>;
      title: string;
      hook: string;
      slug: string;
    }) => {
      const cover = cs.images[0];
      if (!cover) return null;

      return (
        <Link
          key={cs.id}
          to={`/case-study/${cs.slug}`}
          className="group relative w-full overflow-hidden cursor-pointer"
        >
          <CaseStudyCard cover={cover} title={cs.title} hook={cs.hook} />
        </Link>
      );
    }
  )}
</div>
</section>