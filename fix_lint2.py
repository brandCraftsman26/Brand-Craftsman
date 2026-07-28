import re

def fix(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix syntax errors in blogs/[slug] and portfolios/[slug]
    content = content.replace('import { notFound } from "next/navigation"; from "next/navigation";', 'import { notFound } from "next/navigation";')
    content = content.replace('import { notFound } from "next/navigation";\nimport Link from "next/link"; from "next/navigation";', 'import { notFound } from "next/navigation";\nimport Link from "next/link";')
    
    # Fix Navbar.tsx Link syntax errors
    # Wait, in Navbar it might be `<Link href="/"><img ... /></a>` becoming `<Link href="/"><img ... /></Link>`. Let's just restore original and manually fix.
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

for p in ['app/blogs/[slug]/page.tsx', 'app/portfolios/[slug]/page.tsx']:
    fix(p)
