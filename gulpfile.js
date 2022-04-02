import gulp from "gulp";
import browserSync from "browser-sync";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import image from "gulp-image";
import htmlmin from "gulp-htmlmin";
import webphtml from "gulp-webp-html-nosvg";
import cwebp from "gulp-cwebp";

import fileinclude from "gulp-file-include";
import del from "del";

// gulp.task("cleans", function () {
//   return del.sync("dist");
// });

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
    serveStaticOptions: {
      extensions: ["html"],
    },
  });

  gulp.watch("src/**/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("src/**/*.html").on("change", gulp.parallel("html"));
  gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
  gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
  gulp.watch("src/icons/**/*").on("all", gulp.parallel("icons"));
  gulp.watch("src/img/**/*").on("all", gulp.parallel("images"));
  gulp.watch("src/img/**/*").on("all", gulp.parallel("cwebp"));
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(webphtml())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("icons", function () {
  return gulp
    .src("src/icons/**/*")
    .pipe(image())
    .pipe(gulp.dest("dist/icons"))
    .pipe(browserSync.stream());
});

gulp.task("images", function () {
  return gulp
    .src("src/img/**/*")
    .pipe(image())
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
});

gulp.task("cwebp", function () {
  return gulp
    .src("src/img/**/*")
    .pipe(cwebp())
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "scripts",
    "fonts",
    "icons",
    "html",
    "images",
    "cwebp",
  )
);
