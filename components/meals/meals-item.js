"use client";

import Link from 'next/link';
import Image from 'next/image';
import classes from './meals-item.module.css';
import { useTransition } from 'react';
import { removeMeal } from '../../lib/actions';

export default function MealItem({ title, slug, image, summary, creator }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await removeMeal(slug);
    });
  }

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`} className={classes.button}>
            View Details
          </Link>
          <button 
            onClick={handleDelete} 
            disabled={isPending} 
            className={classes.button} // Uses the same styling as the link
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
}
