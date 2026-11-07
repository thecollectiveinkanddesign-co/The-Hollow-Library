
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const stories = [
  {
    id: 1,
    title: "The House Beneath the Moon",
    author: "mothandmoon",
    summary: "There is a house at the edge of the forest that only appears when the moon is full. Some doors are better left unopened.",
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
    summary: "Some love stories are written in letters never sent, and some goodbyes take a lifetime.",
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
    summary: "When the stars begin to disappear, a reluctant astronomer discovers that the night sky is keeping secrets.",
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
    summary: "Two strangers, one forgotten kingdom, and a promise neither remembers making.",
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
    summary: "The orchard blooms once every thirteen years. This time, something has bloomed in the shape of a person.",
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
    summary: "A collection of small moments, unfinished thoughts, and places that only exist in memory.",
    fandom: "Original Work",
    rating: "Not Rated",
    category: "Gen",
    words: 2100,
    chapters: "2/2",
    tags: ["Poetry", "Literary", "Reflection"],
    complete: true,
  },
];

export default function StoryPage() {
  const params = useParams();
  const id = Number(params.id);
  const story = stories.find((item) => item.id === id);

  if (!story) {
    return (
      <main className="library" style={{ padding: "80px 8%" }}>
        <h1>Story not found.</h1>
        <Link href="/">Return to the Library</Link>
      </main>
    );
  }

  return (
    <main className="library">
      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-mark">✧</span>
          <span>
            <strong>The Hollow Library</strong>
            <small>AN ARCHIVE OF IMAGINED WORLDS</small>
          </span>
        </Link>
        <Link href="/" className="text-button">← Back to the Archive</Link>
      </header>

      <section style={{ maxWidth: "900px", margin: "70px auto", padding: "0 24px" }}>
        <p className="eyebrow">{story.fandom} · {story.rating.toUpperCase()} · {story.category}</p>

        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", marginBottom: "16px" }}>
          {story.title}
        </h1>

        <p className="story-author">
          Written by <strong>{story.author}</strong>
        </p>

        <p style={{ marginTop: "32px", lineHeight: 1.9 }}>
          {story.summary}
        </p>

        <div className="story-stats" style={{ marginTop: "28px" }}>
          <span>{story.chapters} chapters</span>
          <span>{story.words.toLocaleString("en-US")} words</span>
          <span>{story.complete ? "Complete" : "In progress"}</span>
        </div>

        <div className="story-tags" style={{ marginTop: "24px" }}>
          {story.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <hr style={{ margin: "48px 0", opacity: 0.2 }} />

        <h2>Chapter One</h2>
        <p style={{ marginTop: "20px", lineHeight: 1.9 }}>
          The pages of this story are waiting to be written...
        </p>

        <p style={{ marginTop: "40px", opacity: 0.6 }}>
          This is a preview page. Full chapter publishing and reading will be connected to the archive database next.
        </p>
      </section>
    </main>
  );
}
