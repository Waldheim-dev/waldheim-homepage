
interface BreadCrumb {
  name: string;
  link?: string;
}

interface Article {
  title: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
  publisher: string;
  description: string;
}

interface Organization {
  url: string;
  logo: string;
  name: string;
  description: string;
  email: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressCountry?: string;
    addressRegion?: string;
    postalCode?: string;
  };
}

interface SoftwareApplication {
  name: string;
  operatingSystem: string;
  applicationCategory: string;
  price: number;
  priceCurrency: string;
  billingFrequency: string;
}

export class SchemaUtils {
  static getBreadcrumbSchema(
    breadcrumb: BreadCrumb[],
  ) {
    const itemListElement = breadcrumb.map((item, index) => {
      let itemSchema = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      if (item.link) {
        // @ts-ignore
        itemSchema['item'] = item.link.includes('https') ? item.link : `https://${item.link}/`;
      }
      return itemSchema;
    });
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemListElement,
    };
  }

  static getArticleSchema(article: Article) {
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      image: article.image,
      author: article.author,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      mainEntityOfPage: article.url,
      publisher: {
        '@type': 'Organization',
        name: article.publisher,
      },
      description: article.description,
    };
  }

  static getOrganizationSchema(
    organization: Organization,
  ) {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      url: organization.url,
      logo: organization.logo,
      name: organization.name,
      description: organization.description,
      email: organization.email,
    };

    if (organization.address) {
      schema.address = {
        '@type': 'PostalAddress',
        streetAddress: organization.address.streetAddress,
        addressLocality: organization.address.addressLocality,
        addressCountry: organization.address.addressCountry,
        addressRegion: organization.address.addressRegion,
        postalCode: organization.address.postalCode,
      };
    }

    return schema;
  }

  static getSoftwareApplicationSchema(app: SoftwareApplication) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.name,
      operatingSystem: app.operatingSystem,
      applicationCategory: app.applicationCategory,
      offers: {
        '@type': 'Offer',
        price: app.price,
        priceCurrency: app.priceCurrency,
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": app.price,
          "priceCurrency": app.priceCurrency,
          "billingFrequency": app.billingFrequency,
          "billingIncrement": 1,
          "priceType": "https://schema.org/ListPrice"
        }
      },
    };
  }
}

