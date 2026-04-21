import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { DropdownMenu, Flex, IconButton, Link } from '@radix-ui/themes';
import { ListIcon, SignOutIcon, XIcon } from '@phosphor-icons/react';
import type { ITopbarLink, ITopbarProps } from './Topbar.types';
import { Avatar, Logo, MenuItem } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import styles from './styles.module.css';

/** Container width (px) at or below which topbar nav links collapse into a hamburger dropdown. Must match the @container query in styles.module.css. */
const NAV_COLLAPSE_BREAKPOINT_PX = 900;

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

  // Keep controlled dropdown state in sync with CSS-driven trigger visibility:
  // if the topbar grows past the inline breakpoint while the menu is open, the
  // hamburger trigger is hidden via `display: none`, which would leave the
  // portal content floating with no visible anchor. Close the menu in that case.
  useEffect(() => {
    if (!navMenuOpen) {
      return;
    }
    const element = topbarRef.current;
    if (!element || typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      if (entry.contentRect.width > NAV_COLLAPSE_BREAKPOINT_PX) {
        setNavMenuOpen(false);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [navMenuOpen]);

  const renderableLinks = links.filter((link) => {
    const href =
      typeof link.anchorProps?.to === 'string'
        ? link.anchorProps.to
        : link.anchorProps?.href;
    return typeof href === 'string' && href.length > 0;
  });
  const renderInlineLink = (link: ITopbarLink) => {
    const href =
      typeof link.anchorProps?.to === 'string'
        ? link.anchorProps.to
        : link.anchorProps?.href;

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

    return (
      <MenuItem
        key={`${link.label}-${href}`}
        anchorComponent={link.anchorComponent}
        anchorProps={normalizedAnchorProps}
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
      width="100%"
      gap="4"
      wrap="wrap"
      className={styles.topbar}
      ref={topbarRef}
    >
      <Flex align="center" gap="4" flexGrow="1" minWidth="0" wrap="wrap">
        <Logo size="medium" anchorComponent={logoAnchorComponent} anchorProps={logoAnchorProps} />

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

        <Flex align="center" justify="end" gap="2" wrap="wrap" className={styles.navLinksInline}>
          {renderableLinks.map(renderInlineLink)}
        </Flex>
      </Flex>

      <Flex align="center" gap="2">
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
                    <AnchorComponent {...item.anchorProps} className={cn(styles.menuButton, item.anchorProps?.className)}>
                      {itemContent}
                    </AnchorComponent>
                  );
                } else if ('href' in item && typeof item.href === 'string') {
                  itemElement = <Link href={item.href}>{itemContent}</Link>;
                } else {
                  itemElement = (
                    <button type="button" onClick={'onClick' in item ? item.onClick : undefined} className={styles.menuButton}>
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
                    {('anchorComponent' in logout && logout.anchorComponent) ? (
                      (() => {
                        const LogoutAnchor = logout.anchorComponent;
                        return (
                          <LogoutAnchor {...logout.anchorProps} className={cn(styles.menuButton, logout.anchorProps?.className)} data-destructive="true">
                            <SignOutIcon size={14} />
                            {logout.label ?? 'Logout'}
                          </LogoutAnchor>
                        );
                      })()
                    ) : ('href' in logout && typeof logout.href === 'string') ? (
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
