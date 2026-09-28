# Päivän Opas

Rakenna production-quality full-stack -sovellus nimeltä "Opintopäiväkirja". Tämä on moderni suomalainen Study OS, jonka ydinsykli on:

suunnittele → opiskele → kirjaa → arvioi → mukauta suunnitelmaa.

TÄRKEÄÄ: tämä ei ole geneerinen dashboard. Käyttäjän tärkein kysymys on "Mitä minun pitää tehdä seuraavaksi?"

VISUAALINEN SUUNTA
Calm Academic / Scandinavian Study OS:
- rauhallinen, älykäs, moderni, kevyt, premium
- ei pelisovellusta, ei Wilma-tyyliä, ei BI-dashboardia, ei Notion-kloonia, ei violettia AI-startup-lookkia
- flat content layer + Liquid Glass vain navigation/control layerissa

Design tokens:
Light: background #F6F7F9, surface #FFFFFF
Dark: background #111214, surface #191B1F, raised #1D2025, text #F4F5F6, secondary #B7BBC2
Typography: Inter / native system stack
Spacing: 4/8/12/16/24/32/48/64
Cards radius 14-16px, inputs 10px, buttons 10-12px, modal 20-24px
Shadows hyvin kevyiksi.

LIQUID GLASS
Luo reusable LiquidGlass-komponentti:
- regular
- clear
- thick
- interactive
Käytä vain: sidebar, mobile bottom nav, floating actions, command palette, sheets, toolbars, modal controls.
Ei tavallisiin sisältökortteihin.
Progressive enhancement:
0 opaque fallback
1 CSS backdrop blur + saturation + adaptive tint + specular/edge highlights
2 SVG displacement/lensing jos suorituskyky sallii
Huomioi prefers-reduced-motion ja prefers-reduced-transparency.

PÄÄNAVIGAATIO
Desktop persistent left sidebar:
- Tänään
- Suunnitelma
- Kurssit
- Kokeet
- Kehitys
erillinen + Kirjaa opiskelu
Asetukset alas
Search, notifications, profile ovat control-toimintoja.

Mobile floating glass bottom bar:
Tänään | Suunnitelma | + | Kurssit | Kehitys
+ avaa opiskelun kirjaamisen/start-session sheetin.

TÄNÄÄN
Default home. Näytä vain:
- greeting + suomalainen päivämäärä
- yksi primary task card: course, topic, planned duration, Aloita opiskelu
- Seuraavaksi 1-3 compact rowta
- tämän viikon tavoite actual/planned + progressbar + remaining
- tärkeä ilmoitus: nearest exam / plan change
- viimeisin reflektio/note + tarvittaessa Kertaa aihe
Ei analytiikkadashboardia.

STUDY SESSION
Start view:
course, topic, planned minutes, goals, Aloita sessio
Running focus view:
course + topic, timer, goal, Tauko, Lopeta, + Lisää huomio
Session completion:
actual duration
competence 1-5
mikä jäi epäselväksi
mitä teit
collapsed advanced details: focus, study method, energy, task numbers, extra note
Saving updates progress, mastery evidence, review scheduling, weekly totals, next action.

SUUNNITELMA
Default week view, plus day/week/month segmented control.
Desktop timeline with time + tasks.
Statuses always icon + text + color:
planned, in_progress, completed, skipped, overdue.
Desktop drag & drop rescheduling, BUT always also ••• → Siirrä accessible alternative.
Everything editable.

SMART PLANNING
When exam added: date, target, current progress, days available, study days, weekly goal.
Generate suggested distribution: content → applications → practice → review → light review → exam.
Never lock the user in.

KURSSIT
Compact rows/medium cards:
code, name, content progress, study time, next topic.

COURSE PAGE
Tabs:
Yleiskuva | Sisältö | Historia | Analyysi

Overview: next topic, exam date, progress, this week study time, latest self-rating, hardest topics.
Content: hierarchical topic list ✓ / ◐ / ○
Topic detail:
content progress
mastery 0-5
study time
tasks
last studied
next review
Keep content progress and mastery clearly separate.

KOKEET
Dedicated page.
List nearest exams:
course, name, date, days remaining, readiness %
Exam detail:
date, target, progress, mastery, remaining topics, review plan, practice tests, study hours
NO grade prediction.

KEHITYS
Actual analytics area.
30 day summary:
study time
change vs previous 30 days
plan completion %
study regularity days/week
mastery development
Then:
weekly actual vs planned bar chart
course time distribution
mastery development
subtle calendar heatmap
efficiency/time-vs-mastery
concrete insights

INSIGHTS
Concrete only:
"KE04:n opiskeluaika on tällä viikolla 1 h 20 min alle suunnitelman."
"Stoikiometrian osaaminen nousi 2/5 → 4/5."
No empty praise.

GAMIFICATION
Only: goals, progress, milestones, completed topics, own-history comparison, "Opiskelurytmi: 4 päivää tällä viikolla"
No XP, levels, leaderboards, streak threats.

SEARCH
Cmd/Ctrl+K command palette desktop, search button mobile.
Search courses, topics, study sessions, notes, exams.
Keyboard navigable.

NOTIFICATIONS SETTINGS
Toggles:
study sessions
exams
plan changes
weekly summary

WEEKLY SUMMARY
Viikko N
study time
plan completion
most studied course
biggest mastery improvement
next week nearest exam
CTA Suunnittele ensi viikko

ONBOARDING
Max 4 steps:
1 welcome
2 first course
3 first exam/target
4 generate first plan
then Today.

ACCESSIBILITY
WCAG 2.2 AA
44x44 practical targets
clear focus indicators
full keyboard support
Escape modals
Enter/Space controls
arrow keys where semantics require
Cmd/Ctrl+K search
N new study log
T Today
Drag never only method.
Color never only status signal.

MOTION
micro 100-150ms
control 160-220ms
panel/sheet 250-350ms
page 200-300ms
easing cubic-bezier(.2,.8,.2,1)
Pressed scale .98, hover translateY(-1px)
No toy bounce animations.

LOADING / EMPTY / ERROR
Use restrained skeletons when needed.
Empty states explain next action.
Errors explain what happened + next action.
Keep local pending copy when possible.

OFFLINE
Study session, reflection, task completion, note should work if network fails.
Store pending local changes and sync later.
Show calm sync status.

DATA MODEL
Multi-course app.
Course:
id, code, name, subject, startDate, examDate, studyMode, target/evaluation system, color, archived, weeklyMinutes, topics[]
Topic:
id, name, weight, importance, dependencies[], materials, progress 0-100, schoolCovered, selfLevel 0-5, verifiedLevel 0-5, lastReview, nextReview, basicSuccesses, examSuccesses, delayedSuccesses
Session:
id, courseId, topicId, date, minutes, kind study/review/test/correction, note, optional reflection fields
Mistake:
id, courseId, topicId, error, type, explanation, status open->corrected->retested->mastered, retryDate
PracticeTest:
id, courseId, date, score, durationMinutes, errorCount, topicResults[]
WeeklyCheckins
ProgressEvents
PlanOverrides
PlanStatusOverrides
NotificationSettings

MASTERY
0 not studied
1 recognize
2 understand model
3 basic problem independently
4 normal exam problem
5 apply/explain
Verified mastery depends on actual evidence: basic success, exam-level success, delayed review. Self-rating alone cannot raise verified mastery.

TARGET SYSTEMS
Support:
school 4-10
YO L/E/M/C/B/A/I
percent
pass/fail
custom
For school: 10=100,9=90,8=80,7=70,6=60,5=50,4=40 mastery target.
Course coverage target always 100%.

READINESS
0-100, NOT grade prediction.
Combine verified mastery, coverage, practice tests, review recency, mistake correction.

PROGRESS CORRIDOR
x start→exam, y 0-100
lower, target, upper, actual, forecast, shaded band
wider early, narrower near exam
above upper means review/deepen/rest, not push new content.

SCHOOL SYNC
Track school-covered separately from personal progress.
Show school vs own.
If far ahead, prefer review/deepening.

RISKS
Separate:
schedule risk
mastery risk
forgetting/review risk

BUFFERS
time buffer days
work buffer sessions
recovery days if below lower bound

DAILY WORKLOAD
Each planned session has minimum / target / extra.
Extra is optional, never debt.
Global workload balances all active courses, especially exams close together.

EXAM MODE
Within 14 days: prioritize risks, reviews, mistakes, practice tests.
Last 2 days: light recall/error list.

KE04 SEED
KE04 Kemialliset reaktiot
start 2026-10-05
exam 2026-11-23
weekly goal 195 min
target grade 10
Topics weights total 100:
Reaktioyhtälöt ja tasapainotus 8
Stoikiometria 10
Reaktion saanto 8
Rajoittava tekijä 9
Ideaalikaasu ja kaasustoikiometria 8
Saostumis- ja hajoamisreaktiot 5
Protoninsiirto, neutraloituminen ja titraus 8
Palamisreaktiot 4
Substituutioreaktiot 5
Additioreaktiot 5
Eliminaatioreaktiot 5
Kondensaatioreaktiot 5
Hydrolyysireaktiot 5
Polymeroituminen ja polymeerit 8
Biomolekyylit 7
Materials:
14-25,14-35,27-35,38-44,46-54,~61-88,92-100,103-111,114-122,132-161,162-210 as appropriate.
Before 2026-10-05 do not recommend new KE04 study content.

COURSE CREATION
Blank course + templates BI05 and KE06.
Fast topic import:
Topic | weight | importance | materials
Normalize weights to 100 when needed.

TECH
Use Lovable default full-stack TypeScript with Tailwind + shadcn/ui.
Use Supabase/PostgreSQL persistence.
Single-user friendly now, clean architecture for auth later.
Persist real data, no fake static cards.
Seed KE04 on first setup.

BUILD ORDER
1 foundation/design system/LiquidGlass/responsive shell
2 persistence/data
3 Today
4 Study Session
5 Courses/course tabs
6 Plan/day-week-month/rescheduling
7 Exams
8 Development/insights/heatmap
9 search/dark/accessibility/offline polish

Do not stop at a pretty prototype. Build the functional app end-to-end.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2dd6ec77-8c7b-42e5-b885-a0649b589ea4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
