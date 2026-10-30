# Animations

<sub><a href="./README.md">← Docs</a></sub>

---

Animation can be tuned globally on `ToastivaProvider` or per toast.

## Presets

```tsx
toastiva.success("Saved", { animationPreset: "snappy" });
```

Available: `"default"`, `"snappy"`, `"gentle"`.

## Full config

```tsx
<ToastivaProvider
  animation={{
    preset: "snappy",
    mount: { axis: "x", offset: 24, duration: 260 },
    morph: { collapseDuration: 190, squishDuration: 44 },
    springs: {
      morph: { damping: 20, stiffness: 360, mass: 0.8 },
    },
  }}
>
  <RootNavigator />
</ToastivaProvider>
```

## Knobs

<table>
  <tr>
    <th align="left">Field</th>
    <th align="left">Description</th>
  </tr>
  <tr>
    <td><code>mount.axis</code></td>
    <td>Slide-in axis — <code>"x"</code> or <code>"y"</code>.</td>
  </tr>
  <tr>
    <td><code>mount.offset</code></td>
    <td>Initial offset distance before settling.</td>
  </tr>
  <tr>
    <td><code>mount.duration</code></td>
    <td>Mount transition duration in ms.</td>
  </tr>
  <tr>
    <td><code>morph.collapseDuration</code></td>
    <td>Collapse phase between layouts.</td>
  </tr>
  <tr>
    <td><code>morph.squishDuration</code></td>
    <td>Squish phase during the morph.</td>
  </tr>
  <tr>
    <td><code>springs.morph</code></td>
    <td>Reanimated spring — <code>damping</code>, <code>stiffness</code>, <code>mass</code>, or <code>duration</code> and <code>dampingRatio</code>. The default preset uses <code>{ duration: 600, dampingRatio: 0.75 }</code>.</td>
  </tr>
</table>

> [!TIP]
> Start with a preset, then override only the fields you need.

---

<sub>Next: <a href="./api.md">API reference →</a></sub>
