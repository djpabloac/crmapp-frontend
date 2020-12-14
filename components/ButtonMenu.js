import React from 'react';
import Link from 'next/link';

export default function ButtonMenu({ caption, url, isSpace }) {
    let isLink = false;
    if (url)
        isLink = true;

    return (
        <>
            {
                isLink ?
                    (
                        <Link href={url}>
                            <span className={`${isSpace ? 'ml-3' : null}`}>
                                <button type="button"
                                    className="btn-menu">
                                    {caption}
                                </button>
                            </span>
                        </Link>
                    ) :
                    (
                        <span className={`${isSpace ? 'ml-3' : null}`}>
                            <button type="button"
                                className="btn-normal">
                                {caption}
                            </button>
                        </span>
                    )
            }

        </>

    );
}