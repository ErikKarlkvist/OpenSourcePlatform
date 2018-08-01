git filter-branch -f --env-filter  'if [ "$GIT_AUTHOR_EMAIL" = "erka@osl-m-erka.local" ]; then
     GIT_AUTHOR_EMAIL=erka@netlight.com;
     GIT_AUTHOR_NAME="Erik Karlkvist";
     GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL;
     GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all