/* myLearn external architecture diagnostic v1.0.1 - generic test only */
(function(){'use strict';
var VERSION='1.0.1',root=document.getElementById('mylearn-architecture-test');if(!root)return;
var release=document.createElement('div');release.className='mat-release';release.textContent='REMOTE UPDATE RECEIVED — v'+VERSION;root.insertBefore(release,root.firstChild);
var passed={css:false,js:false,dom:false,fetch:false,delayed:false};
function set(id,ok,note){var el=document.getElementById(id);if(!el)return;el.textContent=(ok?'✓ PASS':'… WAIT')+(note?' — '+note:'');el.className='mat-status'+(ok?' pass':'');update()}
function update(){var n=Object.keys(passed).filter(function(k){return passed[k]}).length,s=document.getElementById('mat-summary');if(s)s.textContent=n+' / 5 tests passed · asset version v'+VERSION+' · remote deployment test'}
var probe=document.getElementById('mat-css-probe');if(probe&&getComputedStyle(root).borderTopLeftRadius!=='0px'){passed.css=true;set('mat-css',true,'external stylesheet applied')}
passed.js=true;set('mat-js',true,'external script executed');
var injected=document.createElement('div');injected.className='mat-injected';injected.textContent='v1.0.1: this content came from the updated external JavaScript.';root.appendChild(injected);
requestAnimationFrame(function(){if(getComputedStyle(injected).borderTopStyle==='dashed'){passed.dom=true;set('mat-dom',true,'JS-created DOM styled externally')}});
fetch('https://cdn.jsdelivr.net/gh/MOSkillsHub/stream-lxp-external-test@main/architecture-test.css?check=101',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(t){if(t.indexOf('diagnostic')<0)throw new Error('unexpected response');passed.fetch=true;set('mat-fetch',true,'network request succeeded')}).catch(function(e){var el=document.getElementById('mat-fetch');if(el)el.textContent='✗ FAIL — '+e.message});
function findDelayed(){var target=document.getElementById('mylearn-delayed-target');if(target){target.classList.add('mylearn-external-detected');passed.delayed=true;set('mat-delayed',true,'late Stream-like DOM detected');return true}return false}
if(!findDelayed()){var obs=new MutationObserver(function(){if(findDelayed())obs.disconnect()});obs.observe(document.documentElement,{childList:true,subtree:true});setTimeout(function(){obs.disconnect();if(!passed.delayed){var el=document.getElementById('mat-delayed');if(el)el.textContent='✗ FAIL — delayed target not detected'}},12000)}
update()})();