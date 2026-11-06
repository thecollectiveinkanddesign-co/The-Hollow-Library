
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Story = {
  id: number;
  title: string;
  author: string;
  summary: string;
  fandom: string;
  rating: string;
  category: string;
  words: number;
  chapters: string;
  tags: string[];
  complete: boolean;
};

const stories: Story[] = [
  {
    id: 1,
    title: "The House Beneath the Moon",
    author: "mothandmoon",
    summary:
      "There is a house at the edge of the forest that only appears when the moon is full. Some doors are better left unopened.",
    fandom: "Original Work",
    rating: "Teen",
    category: "Gen",
    words: 8200,
    chapters: "4/8",
    tags: ["Gothic", "Mystery", "Supernatural", "Haunted Houses"],
    complete: false,
  },
  {
    id: 2,
    title: "A Thousand Quiet Goodbyes",
    author: "inkandashes",
    summary:
      "Some love stories are written in letters never sent, and some goodbyes take a lifetime.",
    fandom: "Original Work",
    rating: "General",
    category: "F/M",
    words: 15400,
    chapters: "8/8",
    tags: ["Romance", "Drama", "Letters", "Angst"],
    complete: true,
  },
  {
    id: 3,
    title: "The Last Constellation",
    author: "starlessskies",
    summary:
      "When the stars begin to disappear, a reluctant astronomer discovers that the night sky is keeping secrets.",
    fandom: "Original Work",
    rating: "Mature",
    category: "Gen",
    words: 32000,
    chapters: "12/20",
    tags: ["Fantasy", "Angst", "Adventure", "Magic"],
    complete: false,
  },
  {
    id: 4,
    title: "Where the Wild Things Wait",
    author: "velvetghost",
    summary:
      "Two strangers, one forgotten kingdom, and a promise neither remembers making.",
    fandom: "Original Work",
    rating: "Teen",
    category: "F/F",
    words: 12000,
    chapters: "6/6",
    tags: ["Alternate Universe", "Slow Burn", "Found Family"],
    complete: true,
  },
  {
    id: 5,
    title: "The Orchard of Thorns",
    author: "nightjar",
    summary:
      "The orchard blooms once every thirteen years. This time, something has bloomed in the shape of a person.",
    fandom: "Original Work",
    rating: "Explicit",
    category: "Gen",
    words: 6700,
    chapters: "3/10",
    tags: ["Horror", "Dark Fantasy", "Secrets", "Gothic"],
    complete: false,
  },
  {
    id: 6,
    title: "A Map of Unfinished Things",
    author: "paperghost",
    summary:
      "A collection of small moments, unfinished thoughts, and places that only exist in memory.",
    fandom: "Original Work",
    rating: "Not Rated",
    category: "Gen",
    words: 2100,
    chapters: "2/2",
    tags: ["Poetry", "Literary", "Reflection"],
    complete: true,
  },
];

const archiveTags = [
  "Angst",
  "Fluff",
  "Hurt/Comfort",
  "Slow Burn",
  "Enemies to Lovers",
  "Found Family",
  "Dark Fantasy",
  "Gothic",
  "Mystery",
  "Supernatural",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("All ratings");
  const [completion, setCompletion] = useState("All works");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [collects, setCollects] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("Recently Updated");

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        story.title.toLowerCase().includes(query) ||
        story.author.toLowerCase().includes(query) ||
        story.fandom.toLowerCase().includes(query) ||
        story.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesRating =
        rating === "All ratings" || story.rating === rating;

      const matchesCompletion =
        completion === "All works" ||
        (completion === "Complete works" && story.complete) ||
        (completion === "Works in progress" && !story.complete);

      const matchesTags = selectedTags.every((tag) =>
        story.tags.includes(tag)
      );

      return (
        matchesSearch &&
        matchesRating &&
        matchesCompletion &&
        matchesTags
      );
    });
  }, [search, rating, completion, selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  }

  function toggleCollect(id: number) {
    setCollects((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <main className="library">
      <div className="announcement">
        AN INDEPENDENT ARCHIVE BY THE COLLECTIVE DESIGNS
        <span>✦</span>
        A HOME FOR STORIES THAT REFUSE TO BE FORGOTTEN
      </div>

      <header className="site-header">
        <a className="brand" href="#">
          <span className="brand-mark">✧</span>
          <span>
            <strong>The Hollow Library</strong>
            <small>AN ARCHIVE OF IMAGINED WORLDS</small>
          </span>
        </a>

        <nav className="main-nav">
          <a href="#browse">Browse</a>
          <a href="#tags">Tags</a>
          <a href="#about">About the Archive</a>
        </nav>

        <div className="header-actions">
          <Link
            href="/login?mode=login"
            className="text-button"
          >
            Sign in
          </Link>

          <Link
            href="/login?mode=signup"
            className="gold-button"
          >
            Join the Archive
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">
            ✦ &nbsp; BETWEEN THE PAGES OF THE UNKNOWN &nbsp; ✦
          </p>

          <h1>
            Every story
            <br />
            deserves a <em>place</em>
            <br />
            to haunt.
          </h1>

          <p className="hero-description">
            A quiet corner of the internet for extraordinary stories,
            strange little worlds, and the people brave enough to write them.
          </p>

          <div className="hero-actions">
            <a href="#browse" className="gold-button large">
              Explore the Archive <span>↗</span>
            </a>

            <a href="#about" className="outline-button large">
              Our little corner
            </a>
          </div>

          <div className="hero-note">
            <span>✧</span> READ FREELY. WRITE FEARLESSLY. BELONG HERE.
          </div>
        </div>

        <div className="hero-side-note">EST. IN THE QUIET HOURS</div>
      </section>

      <section className="archive-intro" id="about">
        <div>
          <p className="eyebrow">A LIBRARY WITHOUT LOCKED DOORS</p>
          <h2>
            Stories are meant
            <br />
            to be <em>found.</em>
          </h2>
        </div>

        <p className="intro-copy">
          The Hollow Library is an independent, community-built home for
          fanworks and original fiction. Discover new worlds, follow your
          favourite writers, collect the stories that stay with you, and
          leave a little something of your own behind.
          <span>Free to read. Free to create. Always.</span>
        </p>
      </section>

      <section className="browse-section" id="browse">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE ARCHIVE CATALOGUE</p>
            <h2>Wander a little.</h2>
          </div>

          <span className="section-number">01 / DISCOVER</span>
        </div>

        <div className="browse-layout">
          <aside className="filter-panel">
            <p className="filter-heading">SEARCH THE SHELVES</p>

            <label className="search-label" htmlFor="story-search">
              Search titles, authors, tags...
            </label>

            <input
              id="story-search"
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="What are you looking for?"
            />

            <div className="filter-group">
              <label htmlFor="rating-filter">Rating</label>

              <select
                id="rating-filter"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option>All ratings</option>
                <option>General</option>
                <option>Teen</option>
                <option>Mature</option>
                <option>Explicit</option>
                <option>Not Rated</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="completion-filter">
                Completion status
              </label>

              <select
                id="completion-filter"
                value={completion}
                onChange={(event) => setCompletion(event.target.value)}
              >
                <option>All works</option>
                <option>Complete works</option>
                <option>Works in progress</option>
              </select>
            </div>

            <div className="filter-group">
              <p className="filter-heading">POPULAR TAGS</p>

              <div className="tag-options">
                {archiveTags.map((tag) => (
                  <button
                    key={tag}
                    className={`tag-option ${
                      selectedTags.includes(tag) ? "selected" : ""
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {selectedTags.includes(tag) ? "✓ " : "+ "}
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {(search ||
              rating !== "All ratings" ||
              completion !== "All works" ||
              selectedTags.length > 0) && (
              <button
                className="clear-filters"
                onClick={() => {
                  setSearch("");
                  setRating("All ratings");
                  setCompletion("All works");
                  setSelectedTags([]);
                }}
              >
                Clear all filters ×
              </button>
            )}
          </aside>

          <div className="works-area">
            <div className="works-toolbar">
              <div className="tabs">
                {["Recently Updated", "New Works", "Popular"].map((tab) => (
                  <button
                    key={tab}
                    className={activeTab === tab ? "active-tab" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <span className="result-count">
                {filteredStories.length} WORKS FOUND
              </span>
            </div>

            {filteredStories.length === 0 ? (
              <div className="empty-state">
                <span>☾</span>
                <h3>Nothing on this shelf... yet.</h3>
                <p>Try another search or loosen your filters.</p>
              </div>
            ) : (
              <div className="story-list">
                {filteredStories.map((story, index) => (
                  <article className="story-card" key={story.id}>
                    <div className="story-index">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="story-content">
                      <div className="story-meta">
                        <span>{story.fandom}</span>
                        <span>·</span>
                        <span>{story.rating.toUpperCase()}</span>
                        <span>·</span>
                        <span>{story.category}</span>
                      </div>

                      <h3>{story.title}</h3>

                      <p className="story-author">
                        by <span>{story.author}</span>
                      </p>

                      <p className="story-summary">{story.summary}</p>

                      <div className="story-tags">
                        {story.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <div className="story-stats">
                        <span>{story.chapters} chapters</span>
                        <span>
                          {new Intl.NumberFormat("en-US").format(story.words)} words
                        </span>
                        <span>
                          {story.complete ? "Complete" : "In progress"}
                        </span>
                      </div>
                    </div>

                    <button
                      className={`collect-button ${
                        collects.includes(story.id) ? "collected" : ""
                      }`}
                      onClick={() => toggleCollect(story.id)}
                      aria-label={
                        collects.includes(story.id)
                          ? "Remove collect"
                          : "Collect story"
                      }
                    >
                      <span>
                        {collects.includes(story.id) ? "♥" : "♡"}
                      </span>

                      {collects.includes(story.id)
                        ? "Collected"
                        : "Collect"}
                    </button>
                  </article>
                ))}
              </div>
            )}

            <p className="demo-note">
              PREVIEW EDITION · SAMPLE STORIES · COMMUNITY FEATURES ARE IN DEVELOPMENT
            </p>
          </div>
        </div>
      </section>

      <section className="tag-section" id="tags">
        <p className="eyebrow">FOLLOW THE THREADS</p>

        <h2>
          Find your kind of <em>strange.</em>
        </h2>

        <p>
          From familiar favourites to wonderfully specific little obsessions.
          The right story is often hiding behind the right tag.
        </p>

        <div className="tag-cloud">
          {archiveTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                toggleTag(tag);
                document
                  .getElementById("browse")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              ✧ {tag}
            </button>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#">
          <span>✧</span> The Hollow Library
        </a>

        <p>An independent archive by The Collective Designs.</p>

        <p className="footer-small">
          READ FREELY · CREATE FEARLESSLY · KEEP THE STORIES ALIVE
        </p>
      </footer>
    </main>
  );
}
