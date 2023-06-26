import { Component, ViewEncapsulation } from '@angular/core';

enum Knowledgebase {
  BASIC=1,
  ADVANCED,
  EXPERT
}
interface Groups {
  name: string;
  tools: Tool[];
}

interface Image {
  path: string;
  height: number;
  width: number;
}

interface Tool {
  name: string;
  image: Image;
  productive: boolean;
  isActive: boolean;
  fixedExperience: number;
  sinceLastRollup: number;
  knowledgebase: Knowledgebase;
}

@Component({
  selector   : 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls  : ['./brands.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandsComponent {



  //<editor-fold desc="Options">
  angular: Tool = {
    name: 'Angular',
    image: {
      path: 'assets/brands/angular-icon-1.svg',
      height: 50,
      width: 47
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2016-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  ngrx: Tool = {
    name: 'RxJS',
    image: {
      path: 'assets/brands/ngrx.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2020-06-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  react: Tool = {
    name: 'React',
    image: {
      path: 'assets/brands/react-2.svg',
      height: 50,
      width: 44
    },
    productive: false,
    isActive: true,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date('2022-11-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  js: Tool = {
    name: 'JavaScript',
    image: {
      path: 'assets/brands/logo-javascript.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2012-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  ts: Tool = {
    name: 'TypeScript',
    image: {
      path: 'assets/brands/typescript-icon-1.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2016-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  vue: Tool = {
    name: 'VueJS',
    image: {
      path: 'assets/brands/vue-9.svg',
      height: 50,
      width: 58
    },
    productive: false,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  jquery: Tool = {
    name: 'JQuery',
    image: {
      path: 'assets/brands/jquery-4.svg',
      height: 50,
      width: 55
    },
    productive: false,
    isActive: false,
    fixedExperience: 7,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  html: Tool = {
    name: 'HTML',
    image: {
      path: 'assets/brands/html-1.svg',
      height: 50,
      width: 44
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2012-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  css: Tool = {
    name: 'CSS',
    image: {
      path: 'assets/brands/css-3.svg',
      height: 50,
      width: 44
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2012-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  scss: Tool = {
    name: 'SCSS',
    image: {
      path: 'assets/brands/sass-1.svg',
      height: 50,
      width: 44
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2015-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  bootstrap: Tool = {
    name: 'Bootstrap',
    image: {
      path: 'assets/brands/bootstrap-4.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 4,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  tailwind: Tool = {
    name: 'Tailwind',
    image: {
      path: 'assets/brands/tailwind-css-2.svg',
      height: 50,
      width: 83
    },
    productive: false,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  php: Tool = {
    name: 'PHP',
    image: {
      path: 'assets/brands/php-1.svg',
      height: 50,
      width: 95
    },
    productive: false,
    isActive: false,
    fixedExperience: 8,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  laravel: Tool = {
    name: 'Laravel',
    image: {
      path: 'assets/brands/laravel-1.svg',
      height: 50,
      width: 73
    },
    productive: false,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  java: Tool = {
    name: 'Java',
    image: {
      path: 'assets/brands/java-4.svg',
      height: 50,
      width: 27
    },
    productive: true,
    isActive: true,
    fixedExperience: 4,
    sinceLastRollup: (new Date('2022-07-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  illustrator: Tool = {
    name: 'Illustrator',
    image: {
      path: 'assets/brands/adobe-illustrator-cc-icon.svg',
      height: 50,
      width: 51
    },
    productive: false,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2015-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  axure: Tool = {
    name: 'Axure',
    image: {
      path: 'assets/brands/axure-2.svg',
      height: 50,
      width: 51
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-12-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  xd: Tool = {
    name: 'XD',
    image: {
      path: 'assets/brands/adobe-xd-2.svg',
      height: 50,
      width: 51
    },
    productive: false,
    isActive: false,
    fixedExperience: 4,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  figma: Tool = {
    name: 'Figma',
    image: {
      path: 'assets/brands/figma-1.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 2,
    sinceLastRollup: (new Date('2022-07-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  android: Tool = {
    name: 'Android',
    image: {
      path: 'assets/brands/android-4.svg',
      height: 50,
      width: 93
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2014-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  webstandards: Tool = {
    name: 'Web',
    image: {
      path: 'assets/brands/webdev-1.svg',
      height: 50,
      width: 55
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2015-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  flutter: Tool = {
    name: 'Flutter',
    image: {
      path: 'assets/brands/flutter-logo.svg',
      height: 50,
      width: 40
    },
    productive: false,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  capacitor: Tool = {
    name: 'Capacitor',
    image: {
      path: 'assets/brands/capacitor-js.svg',
      height: 50,
      width: 40
    },
    productive: false,
    isActive: false,
    fixedExperience: 3,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  composer: Tool = {
    name: 'Composer',
    image: {
      path: 'assets/brands/composer.svg',
      height: 50,
      width: 55
    },
    productive: false,
    isActive: false,
    fixedExperience: 4,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  jira: Tool = {
    name: 'Jira',
    image: {
      path: 'assets/brands/jira-3.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2017-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  nx: Tool = {
    name: 'nx.dev',
    image: {
      path: 'assets/brands/nx.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2021-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  jest: Tool = {
    name: 'Jest',
    image: {
      path: 'assets/brands/file-type-jest.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2020-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  cypress: Tool = {
    name: 'Cypress',
    image: {
      path: 'assets/brands/cypress-icon.svg',
      height: 50,
      width: 40
    },
    productive: false,
    isActive: false,
    fixedExperience: 3,
    sinceLastRollup: (new Date('2020-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  playwright: Tool = {
    name: 'Playwright',
    image: {
      path: 'assets/brands/file-type-playwright.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2023-01-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  husky: Tool = {
    name: 'Husky',
    image: {
      path: 'assets/brands/husky.png',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-11-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  liquibase: Tool = {
    name: 'Liquibase',
    image: {
      path: 'assets/brands/footer-logo-org.svg',
      height: 50,
      width: 100
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-12-16')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  semantic: Tool = {
    name: 'Semantic',
    image: {
      path: 'assets/brands/semantic-release.png',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2020-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  eslint: Tool = {
    name: 'Eslint',
    image: {
      path: 'assets/brands/eslint-icon.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-07-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  prettier: Tool = {
    name: 'Prettier',
    image: {
      path: 'assets/brands/prettier-2.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-07-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  confluence: Tool = {
    name: 'Confluence',
    image: {
      path: 'assets/brands/confluence-1.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-07-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  gitlab: Tool = {
    name: 'GitLab',
    image: {
      path: 'assets/brands/gitlab-3.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2016-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  github: Tool = {
    name: 'GitHub',
    image: {
      path: 'assets/brands/github-icon-1.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: false,
    fixedExperience: 2,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  bitbucket: Tool = {
    name: 'Bitbucket',
    image: {
      path: 'assets/brands/bitbucket-1.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-11-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  sonarqube: Tool = {
    name: 'SonarQube',
    image: {
      path: 'assets/brands/sonarqube.svg',
      height: 50,
      width: 90
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  nexusiq: Tool = {
    name: 'Nexus IQ',
    image: {
      path: 'assets/brands/OSS-Index_stacked.png',
      height: 50,
      width: 55
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-11-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  nexusrepo: Tool = {
    name: 'Nexus Repo',
    image: {
      path: 'assets/brands/NexusRepo_Vertical.svg',
      height: 50,
      width: 55
    },
    productive: true,
    isActive: true,
    fixedExperience: 2,
    sinceLastRollup: (new Date('2022-11-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  windows: Tool = {
    name: 'Windows',
    image: {
      path: 'assets/brands/microsoft-5.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2002-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  macos: Tool = {
    name: 'macOS',
    image: {
      path: 'assets/brands/apple-13.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2013-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  linux: Tool = {
    name: 'Linux',
    image: {
      path: 'assets/brands/linux-tux.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2015-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  aws: Tool = {
    name: 'AWS',
    image: {
      path: 'assets/brands/aws-2.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2021-07-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  firebase: Tool = {
    name: 'Firebase',
    image: {
      path: 'assets/brands/firebase.svg',
      height: 50,
      width: 40
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2016-01-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  ionos: Tool = {
    name: 'Ionos',
    image: {
      path: 'assets/brands/1and1-ionos-logo.svg',
      height: 50,
      width: 55
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2012-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  grafana: Tool = {
    name: 'Grafana',
    image: {
      path: 'assets/brands/grafana.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2021-01-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  prometheus: Tool = {
    name: 'Prometheus',
    image: {
      path: 'assets/brands/prometheus.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-11-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  checkmk: Tool = {
    name: 'CheckMK',
    image: {
      path: 'assets/brands/checkmk_icon_main.png',
      height: 50,
      width: 55
    },
    productive: true,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  docker: Tool = {
    name: 'Docker',
    image: {
      path: 'assets/brands/docker-icon.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2017-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  portainer: Tool = {
    name: 'Portainer',
    image: {
      path: 'assets/brands/portainer.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  kubernetes: Tool = {
    name: 'Kubernetes',
    image: {
      path: 'assets/brands/kubernets.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-01-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  kafka: Tool = {
    name: 'Kafka',
    image: {
      path: 'assets/brands/kafka-icon.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-07-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  mongodb: Tool = {
    name: 'MongoDB',
    image: {
      path: 'assets/brands/mongodb-icon-1.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 2,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  mysql: Tool = {
    name: 'MariaDB',
    image: {
      path: 'assets/brands/mariadb.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 7,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  mssql: Tool = {
    name: 'msSQL',
    image: {
      path: 'assets/brands/microsoft-sql-server-1.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  wordpress: Tool = {
    name: 'WordPress',
    image: {
      path: 'assets/brands/wordpress-icon.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: true,
    fixedExperience: 3,
    sinceLastRollup: (new Date('2020-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  typo3: Tool = {
    name: 'TYPO3',
    image: {
      path: 'assets/brands/typo3-icon.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 6,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  joomla: Tool = {
    name: 'Joomla',
    image: {
      path: 'assets/brands/joomla-1.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  drupal: Tool = {
    name: 'Drupal',
    image: {
      path: 'assets/brands/drupal-icon.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  nodejs: Tool = {
    name: 'NodeJS',
    image: {
      path: 'assets/brands/nodejs-icon.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2016-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  git: Tool = {
    name: 'Git Basics',
    image: {
      path: 'assets/brands/git-icon.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2016-01-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  postgres: Tool = {
    name: 'PostgreSQL',
    image: {
      path: 'assets/brands/postgresql.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 1,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  traefik: Tool = {
    name: 'Traefik',
    image: {
      path: 'assets/brands/traefik-1.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-01-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  springboot: Tool = {
    name: 'SpringBoot',
    image: {
      path: 'assets/brands/spring-3.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: false,
    fixedExperience: 0.5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  quarkus: Tool = {
    name: 'Quarkus',
    image: {
      path: 'assets/brands/quarkus-icon.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-11-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  stencil: Tool = {
    name: 'Stencil.js',
    image: {
      path: 'assets/brands/stencil-seeklogo.com.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2022-09-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  svelte: Tool = {
    name: 'Svelte',
    image: {
      path: 'assets/brands/svelte.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2023-03-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  vite: Tool = {
    name: 'Vite',
    image: {
      path: 'assets/brands/vitejs.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2023-07-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  astro: Tool = {
    name: 'Astro',
    image: {
      path: 'assets/brands/astro-icon-dark.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2023-07-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  qwik: Tool = {
    name: 'Qwik',
    image: {
      path: 'assets/brands/qwik.svg',
      height: 50,
      width: 50
    },
    productive: false,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2023-07-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }

  rxjs: Tool = {
    name: 'RxJS',
    image: {
      path: 'assets/brands/reactivex.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2020-06-01')).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  ionic: Tool = {
    name: 'Ionic',
    image: {
      path: 'assets/brands/ionic-icon.svg',
      height: 50,
      width: 55
    },
    productive: false,
    isActive: false,
    fixedExperience: 5,
    sinceLastRollup: (new Date()).getTime(),
    knowledgebase: Knowledgebase.ADVANCED
  }

  affinity: Tool = {
    name: 'Affinity',
    image: {
      path: 'assets/brands/file_type_affinitydesigner.svg',
      height: 50,
      width: 50
    },
    productive: true,
    isActive: true,
    fixedExperience: 3,
    sinceLastRollup: (new Date('2021-01-01')).getTime(),
    knowledgebase: Knowledgebase.EXPERT
  }

  jaws: Tool = {
    name: 'Jaws',
    image: {
      path: 'assets/brands/JAWS-screenreader-logo.png',
      height: 50,
      width: 75
    },
    productive: true,
    isActive: true,
    fixedExperience: 0,
    sinceLastRollup: (new Date('2023-01-01')).getTime(),
    knowledgebase: Knowledgebase.BASIC
  }


  frontend: Groups = {
    name: 'Frontend',
    tools: [
      this.angular,
      this.react,
      this.stencil,
      this.vue,
      this.svelte,
      this.vite,
      this.rxjs,
      this.astro,
      this.qwik,
      this.js,
      this.html,
      this.css,
      this.scss,
      this.ts,
      this.webstandards,
      this.ngrx,
      this.jquery,
      this.bootstrap,
      this.tailwind,
      this.ionic,
      this.capacitor,
      this.flutter,
      this.husky,
      this.eslint,
      this.prettier,
      this.semantic,
      this.nx,
      this.jest,
      this.cypress,
      this.playwright,
      this.jaws
    ]
  }

  backend: Groups = {
    name: 'Backend',
    tools: [
      this.nodejs,
      this.java,
      this.php,
      this.quarkus,
      this.composer,
      this.springboot,
      this.laravel,
      this.liquibase,
      this.postgres,
      this.mysql,
      this.mongodb,
      this.mssql,
    ]
  }


  systems: Groups = {
    name: 'Betriebssysteme',
    tools: [
      this.windows,
      this.macos,
      this.android,
      this.linux
    ]
  }

  design: Groups = {
    name: 'UI / UX',
    tools: [
      this.illustrator,
      this.affinity,
      this.figma,
      this.xd,
      this.axure,
    ]
  }

  monitoring: Groups = {
    name: 'DevOps',
    tools: [
      this.docker,
      this.kubernetes,
      this.kafka,
      this.traefik,
      this.portainer,
      this.grafana,
      this.prometheus,
      this.checkmk,
      this.git,
      this.gitlab,
      this.bitbucket,
      this.github,
      this.sonarqube,
      this.nexusiq,
      this.jira,
      this.confluence,
      this.ionos,
      this.firebase,
      this.nexusrepo,
      this.aws,
    ]
  }


  cms: Groups = {
    name: 'CMS',
    tools: [
      this.wordpress,
      this.typo3,
      this.joomla,
      this.drupal
    ]
  }


  groups: Groups[] = [
    this.frontend,
    this.backend,
    this.monitoring,
    this.design,
    this.systems,
    this.cms
  ];
  //</editor-fold>


  acceptableDenominators = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  maxDistanceToNumerator = 0.0001;


  constructor() {
    // Order Tools in Groups by productive, then active, then years of experience
    this.groups.forEach(group => {
      group.tools.sort((a, b) => {
        if (a.productive === b.productive) {
          if (a.isActive === b.isActive) {
            return b.fixedExperience - a.fixedExperience;
          }
          return b.isActive ? 1 : -1;
        }
        return b.productive ? 1 : -1;
      });
    })
  }



  getPercentExp(tool: Tool, group: Tool[]) {
    const max = Math.max(...group.map(o => Number(this.getTotalExp(o, true))));
    // console.log(max, Number(this.getTotalExp(tool, true)), 100 * Number(this.getTotalExp(tool, true)) / max )
    return 100 * Number(this.getTotalExp(tool, true)) / max;
  }

  getTotalExp(tool: Tool, onlyNumber = false) {
    let years: string | number = tool.fixedExperience;
    if (tool.isActive) {
      const currentDate = (new Date()).getTime();
      years += (new Date(currentDate).getFullYear() - new Date(tool.sinceLastRollup).getFullYear());
    }

    if (years  < 1) {
      if (years === 0) {
        years += 0.25;
      }
      if (!onlyNumber) {
        const breaker = this.numberToFractionString(years);
        if (breaker && breaker.length > 0) {
          years = breaker;
        }
      }
    }
    return years;
  }

  numberToFractionString(n: number): string | undefined {
    const negative = (n < 0);
    if (negative) n = -n;

    const wholePart = Math.floor(n);
    n -= wholePart;

    const denom = this.acceptableDenominators.find(d =>
      Math.abs(d * n - Math.round(d * n)) <= this.maxDistanceToNumerator
    );
    if (typeof denom === 'undefined') {
      return;
    }
    const numer = Math.round(denom * n);

    if (denom === 1) {
      return "" + (wholePart + numer) * (negative ? -1 : 1);
    }

    return (negative ? "-" : "") +
      (wholePart ? wholePart + " " : "") +
      numer + "/" + denom;

  }
}
