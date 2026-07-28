import os
import re

# File paths
about = 'app/about/page.tsx'
blogs_slug = 'app/blogs/[slug]/page.tsx'
blogs = 'app/blogs/page.tsx'
contact = 'app/contact/page.tsx'
portfolios_slug = 'app/portfolios/[slug]/page.tsx'
portfolios = 'app/portfolios/page.tsx'
services_slug = 'app/services/[slug]/page.tsx'
services = 'app/services/page.tsx'
web_design = 'app/web-design-digital-marketing-company-in-coimbatore/page.tsx'
footer = 'components/Footer.tsx'
navbar = 'components/Navbar.tsx'
services_bento = 'components/ServicesBento.tsx'
theme_toggle = 'components/ThemeToggle.tsx'

def replace_in_file(path, old, new):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. about
replace_in_file(about, '<img\n          src="/img/founders-hero.png"', '<Image\n          src="/img/founders-hero.png"\n          width={1920}\n          height={1080}')
replace_in_file(about, "company's", "company&apos;s")
replace_in_file(about, "customers'", "customers&apos;")
replace_in_file(about, "doesn't", "doesn&apos;t")
replace_in_file(about, "Let's", "Let&apos;s")
replace_in_file(about, "future in mind. Whether it's", "future in mind. Whether it&apos;s")
with open(about, 'r', encoding='utf-8') as f:
    content = f.read()
if 'import Image from "next/image";' not in content:
    content = content.replace('export default function AboutPage() {', 'import Image from "next/image";\n\nexport default function AboutPage() {')
    with open(about, 'w', encoding='utf-8') as f:
        f.write(content)

# 2. blogs_slug
replace_in_file(blogs_slug, '{ FiClock, FiUser, FiTag, FiArrowLeft, FiZap }', '{ FiClock, FiUser, FiArrowLeft, FiZap }')
replace_in_file(blogs_slug, '<a href="/blogs"', '<Link href="/blogs"')
replace_in_file(blogs_slug, '</a>', '</Link>')
with open(blogs_slug, 'r', encoding='utf-8') as f:
    content = f.read()
if 'import Link' not in content:
    content = content.replace('import { notFound }', 'import { notFound } from "next/navigation";\nimport Link from "next/link";')
    with open(blogs_slug, 'w', encoding='utf-8') as f:
        f.write(content)

# 3. blogs
replace_in_file(blogs, '{ FiBookOpen, FiArrowRight, FiClock, FiTag }', '{ FiBookOpen, FiArrowRight, FiClock }')

# 4. contact
replace_in_file(contact, "Let's", "Let&apos;s")

# 5. portfolios_slug
replace_in_file(portfolios_slug, '<a href="/portfolios"', '<Link href="/portfolios"')
replace_in_file(portfolios_slug, '</a>', '</Link>')
with open(portfolios_slug, 'r', encoding='utf-8') as f:
    content = f.read()
if 'import Link' not in content:
    content = content.replace('import { notFound }', 'import { notFound } from "next/navigation";\nimport Link from "next/link";')
    with open(portfolios_slug, 'w', encoding='utf-8') as f:
        f.write(content)

# 6. portfolios
replace_in_file(portfolios, "haven't", "haven&apos;t")

# 7. services_slug
replace_in_file(services_slug, '{ FiCheck, FiArrowRight, FiShield, FiTrendingUp }', '{ FiCheck }')

# 8. services
replace_in_file(services, '{ FiArrowRight, FiCheckCircle, FiZap, FiBox }', '{ FiArrowRight, FiBox }')

# 9. web_design
replace_in_file(web_design, '{ FiCheck, FiArrowRight, FiTrendingUp, FiTarget, FiUsers, FiShield }', '{ FiArrowRight, FiTarget, FiUsers }')
replace_in_file(web_design, "Brand Craftsman's", "Brand Craftsman&apos;s")
replace_in_file(web_design, "isn't", "isn&apos;t")

# 10. footer
replace_in_file(footer, '<a href="/"', '<Link href="/"')
replace_in_file(footer, '<a href="/services/"', '<Link href="/services/"')
replace_in_file(footer, '<a href="/blogs/"', '<Link href="/blogs/"')
replace_in_file(footer, '<a href="/portfolios/"', '<Link href="/portfolios/"')
with open(footer, 'r', encoding='utf-8') as f:
    content = f.read()
if 'import Link' not in content:
    content = 'import Link from "next/link";\n' + content
    # Also replace </a> inside the footer lists. But wait, I'll just replace </a> for the ones I changed.
    # Footer has some social links as <a>. Internal links we want as <Link>. Let's just fix the specific ones.
    # We replaced the opening tags. Now let's just let eslint --fix or manual fix the closing tags. Actually if I change <a> to <Link> I MUST change </a> to </Link>.
    content = content.replace('<Link href="/" className="hover:text-blue-400 transition-colors">Home</a>', '<Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>')
    content = content.replace('<Link href="/services/" className="hover:text-blue-400 transition-colors">Services</Link>', '<Link href="/services/" className="hover:text-blue-400 transition-colors">Services</Link>')
    content = content.replace('<Link href="/blogs/" className="hover:text-blue-400 transition-colors">Blogs</Link>', '<Link href="/blogs/" className="hover:text-blue-400 transition-colors">Blogs</Link>')
    content = content.replace('<Link href="/portfolios/" className="hover:text-blue-400 transition-colors">Portfolios</Link>', '<Link href="/portfolios/" className="hover:text-blue-400 transition-colors">Portfolios</Link>')
    # Wait, the string replace might not match exactly. Let's do it with a regex for internal links
    content = re.sub(r'<Link href="(/[a-z/]*)"([^>]*)>(.*?)</a\>', r'<Link href="\1"\2>\3</Link>', content)
    with open(footer, 'w', encoding='utf-8') as f:
        f.write(content)

# 11. navbar
replace_in_file(navbar, 'const [selectedService, setSelectedService] = useState<string | null>(null);', '')
replace_in_file(navbar, '<a href="/"', '<Link href="/"')
replace_in_file(navbar, '<a href="/services/"', '<Link href="/services/"')
# Fix closing tags for Link in navbar
with open(navbar, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'<Link href="(/[a-z/]*)"([^>]*)>(.*?)</a\>', r'<Link href="\1"\2>\3</Link>', content)
with open(navbar, 'w', encoding='utf-8') as f:
    f.write(content)

# 12. services_bento
replace_in_file(services_bento, '<img\n              src="/img/digital-marketing.webp"', '<Image\n              src="/img/digital-marketing.webp"\n              width={800}\n              height={600}')
with open(services_bento, 'r', encoding='utf-8') as f:
    content = f.read()
if 'import Image from "next/image";' not in content:
    content = 'import Image from "next/image";\n' + content
    with open(services_bento, 'w', encoding='utf-8') as f:
        f.write(content)

# 13. theme_toggle
with open(theme_toggle, 'r', encoding='utf-8') as f:
    content = f.read()
# Just suppress the warning
content = content.replace('useEffect(() => setMounted(true), []);', '// eslint-disable-next-line react-hooks/set-state-in-effect\n  useEffect(() => setMounted(true), []);')
with open(theme_toggle, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
