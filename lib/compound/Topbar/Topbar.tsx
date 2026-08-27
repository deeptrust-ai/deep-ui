import cn from 'classnames';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DropdownMenu, Flex, IconButton, Link } from '@radix-ui/themes';
import { ListIcon, SignOutIcon, XIcon } from '@phosphor-icons/react';
import type { ITopbarLink, ITopbarProps } from './Topbar.types';
import { Avatar, Logo, MenuItem } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import styles from './styles.module.css';

/**
 * Tiers the nav degrades through as the topbar row runs out of room: full
 * labels, icons only, then a hamburger dropdown. The active tier is chosen by
 * measuring real overflow rather than by width breakpoints, because the room
 * left for the nav depends on the breadcrumb, which varies per page rather than
 * per viewport.
 */
const NAV_TIERS = ['full', 'icons', 'menu'] as const;
type NavTier = (typeof NAV_TIERS)[number];
const NARROWEST_NAV_TIER = NAV_TIERS[NAV_TIERS.length - 1];

/** Sub-pixel layout rounding can make a row report a scrollWidth a hair wider than its box. */
const OVERFLOW_TOLERANCE_PX = 1;

/** There is nothing to measure while server rendering, where `useLayoutEffect` only warns. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const Topbar = ({
  organizations,
  workspaces = [],
  pages = [],
  disableOrganizationsDropdown = false,
  disableWorkspacesDropdown = false,
  selectedOrganizationId,
  selectedWorkspaceIds,
  defaultSelectedWorkspaceIds,
  onOrganizationSelect,
  onWorkspaceSelectionChange,
  links = [],
  logoAnchorComponent,
  logoAnchorProps,
  userName,
  userPfp,
  userMenuItems = [],
  logout,
}: ITopbarProps) => {
  const hasUserMenu = userMenuItems.length > 0 || !!logout;
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const topbarRef = useRef<HTMLDivElement | null>(null);
  const contentRowRef = useRef<HTMLDivElement | null>(null);

  /**
   * Picks the widest tier whose content fits on one line. The tier is written
   * straight to the DOM rather than held in state: the decision needs a
   * measurement per candidate tier, and doing that in one synchronous pass
   * avoids a render (and a paint) per step.
   */
  const applyNavTier = useCallback(() => {
    const element = topbarRef.current;
    if (!element) {
      return;
    }

    // The left row is the flexible one, so it is where content stops fitting:
    // it shrinks to whatever the row leaves it and lets its own content spill,
    // which keeps the topbar itself reporting no overflow at all.
    const overflowOf = (node: HTMLElement | null) =>
      node ? node.scrollWidth - node.clientWidth : 0;

    let appliedTier: NavTier = NARROWEST_NAV_TIER;
    for (const tier of NAV_TIERS) {
      element.dataset.navTier = tier;
      const overflow = Math.max(overflowOf(element), overflowOf(contentRowRef.current));
      if (overflow <= OVERFLOW_TOLERANCE_PX) {
        appliedTier = tier;
        break;
      }
    }

    // The hamburger trigger only exists at the narrowest tier; an open menu past
    // that point would leave the portal content floating with no visible anchor.
    if (appliedTier !== NARROWEST_NAV_TIER) {
      setNavMenuOpen(false);
    }
  }, []);

  // Re-measure after every render, which covers the breadcrumb and nav labels
  // growing or shrinking as the user navigates — the row is never resized then,
  // so a resize observer alone would leave the nav collapsed on a page that now
  // has room for it.
  useIsomorphicLayoutEffect(applyNavTier);

  useEffect(() => {
    const element = topbarRef.current;
    if (!element || typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(() => applyNavTier());
    observer.observe(element);
    return () => observer.disconnect();
  }, [applyNavTier]);

  const renderableLinks = links.filter((link) => {
    const href =
      typeof link.anchorProps?.to === 'string' ? link.anchorProps.to : link.anchorProps?.href;
    return typeof href === 'string' && href.length > 0;
  });
  const renderInlineLink = (link: ITopbarLink) => {
    const href =
      typeof link.anchorProps?.to === 'string' ? link.anchorProps.to : link.anchorProps?.href;

    if (!href) {
      return null;
    }

    const normalizedAnchorProps =
      link.anchorComponent || !link.anchorProps?.to
        ? link.anchorProps
        : (() => {
            const { to, href: currentHref, ...anchorProps } = link.anchorProps;

            return {
              ...anchorProps,
              href: to ?? currentHref,
            };
          })();

    // `title` gives a native tooltip once the icon-only tier hides the label,
    // while still honoring a caller-supplied title.
    const anchorPropsWithTitle = {
      ...normalizedAnchorProps,
      title: normalizedAnchorProps?.title ?? link.label,
    };

    return (
      <MenuItem
        key={`${link.label}-${href}`}
        anchorComponent={link.anchorComponent}
        anchorProps={anchorPropsWithTitle}
        icon={link.icon}
        label={link.label}
        selected={link.selected}
        activeClassName={link.activeClassName}
      />
    );
  };

  return (
    <Flex
      justify="between"
      align="center"
      p="4"
      data-testid="app-topbar"
      data-nav-tier="full"
      width="100%"
      gap="4"
      wrap="nowrap"
      className={styles.topbar}
      ref={topbarRef}
    >
      <Flex align="center" gap="4" flexGrow="1" minWidth="0" wrap="nowrap" ref={contentRowRef}>
        <Logo size="medium" anchorComponent={logoAnchorComponent} anchorProps={logoAnchorProps} />

        <div className={styles.breadcrumbs}>
          <Breadcrumbs
            pages={pages}
            organizations={organizations}
            disableOrganizationsDropdown={disableOrganizationsDropdown}
            disableWorkspacesDropdown={disableWorkspacesDropdown}
            selectedOrganizationId={selectedOrganizationId}
            workspaces={workspaces}
            selectedWorkspaceIds={selectedWorkspaceIds}
            defaultSelectedWorkspaceIds={defaultSelectedWorkspaceIds}
            onOrganizationSelect={onOrganizationSelect}
            onWorkspaceSelectionChange={onWorkspaceSelectionChange}
          />
        </div>

        <Flex align="center" justify="end" gap="2" wrap="nowrap" className={styles.navLinksInline}>
          {renderableLinks.map(renderInlineLink)}
        </Flex>
      </Flex>

      <Flex align="center" gap="2" wrap="nowrap" flexShrink="0">
        {renderableLinks.length > 0 ? (
          <div className={styles.navLinksCollapsed}>
            <DropdownMenu.Root open={navMenuOpen} onOpenChange={setNavMenuOpen}>
              <DropdownMenu.Trigger>
                <IconButton
                  variant="ghost"
                  aria-label={navMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  data-testid="app-topbar-nav-toggle"
                >
                  {navMenuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                {renderableLinks.map((link) => {
                  const LinkIcon = link.icon;
                  const href =
                    typeof link.anchorProps?.to === 'string'
                      ? link.anchorProps.to
                      : link.anchorProps?.href;
                  if (!href) {
                    return null;
                  }

                  const itemContent = (
                    <>
                      {LinkIcon ? <LinkIcon size={14} /> : null}
                      {link.label}
                    </>
                  );

                  let itemElement: React.ReactNode;
                  if (link.anchorComponent) {
                    const LinkAnchor = link.anchorComponent;
                    itemElement = (
                      <LinkAnchor
                        {...link.anchorProps}
                        className={cn(styles.menuButton, link.anchorProps?.className)}
                        data-selected={link.selected ? 'true' : undefined}
                      >
                        {itemContent}
                      </LinkAnchor>
                    );
                  } else {
                    const {
                      to: _unusedTo,
                      href: _unusedHref,
                      className: anchorClassName,
                      ...restAnchorProps
                    } = link.anchorProps ?? {};
                    void _unusedTo;
                    void _unusedHref;
                    itemElement = (
                      <Link asChild>
                        <a
                          {...restAnchorProps}
                          href={href}
                          className={cn(styles.menuButton, anchorClassName)}
                          data-selected={link.selected ? 'true' : undefined}
                        >
                          {itemContent}
                        </a>
                      </Link>
                    );
                  }

                  return (
                    <DropdownMenu.Item key={`${link.label}-${href}`} asChild>
                      {itemElement}
                    </DropdownMenu.Item>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        ) : null}

        {hasUserMenu ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" radius="full" aria-label="User menu">
                <Avatar name={userName} pfp={userPfp} />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {userMenuItems.map((item) => {
                const itemContent = (
                  <>
                    {item.icon ? <item.icon size={14} /> : null}
                    {item.label}
                  </>
                );

                let itemElement: React.ReactNode;
                if ('anchorComponent' in item && item.anchorComponent) {
                  const AnchorComponent = item.anchorComponent;
                  itemElement = (
                    <AnchorComponent
                      {...item.anchorProps}
                      className={cn(styles.menuButton, item.anchorProps?.className)}
                    >
                      {itemContent}
                    </AnchorComponent>
                  );
                } else if ('href' in item && typeof item.href === 'string') {
                  itemElement = <Link href={item.href}>{itemContent}</Link>;
                } else {
                  itemElement = (
                    <button
                      type="button"
                      onClick={'onClick' in item ? item.onClick : undefined}
                      className={styles.menuButton}
                    >
                      {itemContent}
                    </button>
                  );
                }

                return (
                  <DropdownMenu.Item key={item.label} asChild shortcut={item.shortcut}>
                    {itemElement}
                  </DropdownMenu.Item>
                );
              })}
              {logout ? (
                <>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item shortcut={logout.shortcut} color="red" asChild>
                    {'anchorComponent' in logout && logout.anchorComponent ? (
                      (() => {
                        const LogoutAnchor = logout.anchorComponent;
                        return (
                          <LogoutAnchor
                            {...logout.anchorProps}
                            className={cn(styles.menuButton, logout.anchorProps?.className)}
                            data-destructive="true"
                          >
                            <SignOutIcon size={14} />
                            {logout.label ?? 'Logout'}
                          </LogoutAnchor>
                        );
                      })()
                    ) : 'href' in logout && typeof logout.href === 'string' ? (
                      <Link href={logout.href}>
                        <SignOutIcon size={14} />
                        {logout.label ?? 'Logout'}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={'onClick' in logout ? logout.onClick : undefined}
                        className={styles.menuButton}
                        data-destructive="true"
                      >
                        <SignOutIcon size={14} />
                        {logout.label ?? 'Logout'}
                      </button>
                    )}
                  </DropdownMenu.Item>
                </>
              ) : null}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <Avatar name={userName} pfp={userPfp} />
        )}
      </Flex>
    </Flex>
  );
};

export default Topbar;
